from dotenv import load_dotenv
import os

load_dotenv()

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from rag_pipeline import RAGPipeline
from multimodal_utils import MultimodalProcessor
import shutil

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

rag = RAGPipeline()
processor = MultimodalProcessor()

@app.post("/chat")
async def chat(
    message: str = Form(None), 
    file: UploadFile = File(None),
    input_type: str = Form("text")
):
    final_query = message

    if file:
        file_path = f"temp_{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        if input_type == "audio":
            final_query = processor.transcribe_audio(file_path)
        elif input_type == "image":
            # Convert image to text description then ask LLM to explain
            description = processor.caption_image(file_path)
            final_query = f"The user provided an image. It contains: {description}. Please explain this or answer based on documents."
        
        os.remove(file_path)

    answer, sources = rag.query(final_query)
    return {"answer": answer, "sources": sources, "query_used": final_query}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)