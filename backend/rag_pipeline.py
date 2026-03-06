import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.retrievers import ParentDocumentRetriever
from langchain.storage import InMemoryStore
from langchain_groq import ChatGroq



class RAGPipeline:
    def __init__(self, data_folder="./data"):
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.llm = ChatGroq(
    model="llama-3.1-8b-instant",
    groq_api_key=os.getenv("GROQ_API_KEY"),
    temperature=0
)
        
        # Parent-Child Splitters
        self.parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000)
        self.child_splitter = RecursiveCharacterTextSplitter(chunk_size=400)
        
        self.vectorstore = FAISS.from_texts(["Initial index"], self.embeddings)
        self.docstore = InMemoryStore()
        
        self.retriever = ParentDocumentRetriever(
            vectorstore=self.vectorstore,
            docstore=self.docstore,
            child_splitter=self.child_splitter,
            parent_splitter=self.parent_splitter,
        )
        self._ingest_data(data_folder)

    def _ingest_data(self, folder):
        docs = []
        for file in os.listdir(folder):
            if file.endswith(".pdf"):
                loader = PyPDFLoader(os.path.join(folder, file))
                docs.extend(loader.load())
        if docs:
            self.retriever.add_documents(docs)

    def query(self, user_input):
        # Retrieve context
        context_docs = self.retriever.invoke(user_input)
        context_text = "\n\n".join([doc.page_content for doc in context_docs])
        sources = list(set([doc.metadata.get("source", "Unknown") for doc in context_docs]))

        prompt = f"""Use the context below to answer the question.
        Context: {context_text}
        Question: {user_input}
        Answer:"""
        
        response = self.llm.invoke(prompt)
        return response.content, sources

