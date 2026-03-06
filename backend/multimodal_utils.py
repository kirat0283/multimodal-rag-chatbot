# import whisper
# from transformers import pipeline
# from PIL import Image
# import torch

# class MultimodalProcessor:
#     def __init__(self):
#         # Load Whisper for Audio (Local)
#         self.audio_model = whisper.load_model("base")
#         # Load BLIP for Image Captioning (Local)
#         self.image_model = pipeline("image-to-text", model="Salesforce/blip-image-captioning-large")



#     def transcribe_audio(self, audio_path):
#         result = self.audio_model.transcribe(audio_path)
#         return result['text']

#     def caption_image(self, image_path):
#         image = Image.open(image_path).convert("RGB")
#         result = self.image_model(image)
#         return result[0]['generated_text']




import whisper
from transformers import pipeline
from PIL import Image
import pytesseract
import torch

# For Windows users (change path if needed)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

class MultimodalProcessor:
    def __init__(self):
        # Load Whisper for Audio
        self.audio_model = whisper.load_model("base")

        # Load BLIP for Image Captioning
        self.image_model = pipeline(
            "image-to-text",
            model="Salesforce/blip-image-captioning-large"
        )

    def transcribe_audio(self, audio_path):
        result = self.audio_model.transcribe(audio_path)
        return result['text']

    def caption_image(self, image_path):

        image = Image.open(image_path).convert("RGB")

        # 1️⃣ Caption from BLIP
        caption_result = self.image_model(image, max_new_tokens=120)
        caption = caption_result[0]['generated_text']

        # 2️⃣ Extract text from image using OCR
        ocr_text = pytesseract.image_to_string(image)

        # 3️⃣ Combine both
        combined_output = f"""
Image Description:
{caption}

Text Extracted From Image:
{ocr_text}
"""

        return combined_output
