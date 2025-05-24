import pdfplumber
import re
import spacy
from fastapi import FastAPI,File,UploadFile
import tempfile
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

nlp = spacy.load("en_core_web_sm")
SECTION_HEADERS = {
    "education": ["education", "academic background", "qualifications"],
    "experience": ["experience", "work experience", "employment", "professional experience"],
    "skills": ["skills", "technical skills","key skills","industry skills"],
    "certifications": ["certifications", "certificates"],
    "projects": ["projects", "personal projects"],
    "achievements":["key achievements","achievements","achievement","most proud of"],
    "trainings":["trainings","training"],
    "awards":["awards","honors"],
    "industry_expertise":["industry expertise"],
    "passions":["passions","passions"],
    "languages":["language"]
}

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text
def extract_liks(text):
    url_pattern = re.compile(r'(https?://[^\s]+)')
    urls=url_pattern.findall(text.lower())
    links = {
        "linkedin": None,
        "github": None,
        "portfolio": None,
    }
    for url in urls:
        if "linkedin.com" in url:
            links["linkedin"] = url
        elif "github.com" in url:
            links["github"] = url
        elif any(domain in url for domain in ["portfolio", "personal", "site", "dev", "mywebsite", "me"]):
            links["portfolio"] = url
        elif links["portfolio"] is None and "linkedin.com" not in url and "github.com" not in url:
            links["portfolio"] = url
    return links

def extract_name(text):
    doc = nlp(text[:300])
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return None

def extract_contact_info(text):
    email = re.findall(r'\b[\w\.-]+@[\w\.-]+\.\w+\b', text)
    phone = re.findall(r'\+?\d[\d\s().-]{7,}\d', text)
    return {
        "email": email[0] if email else None,
        "phone": phone[0] if phone else None
    }

def extract_section(text, section_name):
    keywords = SECTION_HEADERS.get(section_name, [])
    lines = text.splitlines()
    content = []
    capture = False
    for line in lines:
        line_lower = line.lower().strip()
        if any(kw in line_lower for kw in keywords):
            capture = True
            continue
        elif capture and any(h in line_lower for hs in SECTION_HEADERS.values() for h in hs):
            break
        if capture:
            content.append(line.strip())
    return content

def extract_resume_data(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    data = {
  
        "personalDetails":{
                "name": extract_name(text),
                "email": extract_contact_info(text)["email"],
                "phone": extract_contact_info(text)["phone"],
                "urls":extract_liks(text)
        },
        "education": extract_section(text, "education"),
        "experience": extract_section(text, "experience"),
        "skills": extract_section(text, "skills"),
        "certifications": extract_section(text, "certifications"),
        "projects": extract_section(text, "projects"),
        "trainings":extract_section(text,"trainigs"),
        "passions":extract_section(text,"passions"),
        "industry_expertise":extract_section(text,"industry_expertise"),
        "languages":extract_section(text,"languages"),
        "awards":extract_section(text,"awards"),
        "achievements":extract_section(text,"achievements"),
        "raw_text": text,
    }
    return data

@app.get("/")
def index():
    return {"message": "Index page"}

@app.post("/extract")
async def upload(file:UploadFile=File(...)):
    with tempfile.NamedTemporaryFile(delete=False,suffix=".pdf") as tmp:
        content=await file.read()
        tmp.write(content)
        temp_path = tmp.name
    parsed = extract_resume_data(temp_path)
    return parsed
    
   
