Here’s a clear and concise README file for your FastAPI resume PDF extraction project, including setup instructions and virtual environment guidance for different platforms:

---

# Resume PDF Extractor API

A FastAPI-based web service to extract structured resume information (name, contact info, education, experience, skills, certifications, and projects) from PDF files using `pdfplumber` and `spaCy`.

---

## Features

* Extracts text content from PDF resumes
* Uses spaCy NER to extract the candidate's name
* Extracts email and phone numbers using regex
* Parses key resume sections based on predefined headers
* CORS enabled for local React frontend at ports 3000

---

## Requirements

* Python 3.8+
* Libraries listed in `requirements.txt`

---

## Installation

### 1. Clone the repository

```bash
git checkout -b server
git clone <git@github.com:Debaraj-stha/resume-builder.git>
cd <repo-folder>
```

### 2. Create and activate a virtual environment

#### On Windows (PowerShell)

```powershell
python -m venv venv
.\venv\Scripts\activate
```

#### On macOS/Linux (bash/zsh)

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Download spaCy English model

```bash
python -m spacy download en_core_web_sm
```

---

## Running the API

```bash
uvicorn main:app --reload
```

* The API will be accessible at `http://127.0.0.1:8000`
* Frontend running at `http://localhost:3000` or `http://127.0.0.1:3000` is allowed by CORS

---

## API Endpoints

* `GET /`
  Returns a welcome message.

* `POST /extract`
  Upload a PDF file (`multipart/form-data`, key=`file`) to extract resume data.
  Returns JSON with extracted fields.

---

## Example cURL request

```bash
curl -X POST "http://127.0.0.1:8000/extract" -F "file=@/path/to/resume.pdf"
```

---

## Project Structure

* `main.py` — FastAPI app and extraction logic
* `requirements.txt` — Python dependencies

---

## Notes

* Temporary files are used to store uploaded PDFs during processing.
* Extraction is based on keyword matching and basic NLP; accuracy depends on resume format.
* Feel free to customize section headers in `SECTION_HEADERS` dictionary.

---

If you want me to help you set up Docker or deploy the app, just ask!
