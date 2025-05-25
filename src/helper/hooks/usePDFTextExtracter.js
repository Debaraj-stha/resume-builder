
import { useCallback } from 'react';
const usePDFTextExtracter = () => {
  return useCallback(async (file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("http://localhost:8000/extract", {
        method: "POST",
        body: formData
      })
      const jsonRes = await res.json()
      const obj = {
        
        "personalDetails": jsonRes["personalDetails"],
        "educations": jsonRes["education"],
        "experiences": jsonRes["experience"],
        "skills": jsonRes["skills"],
        "certifications": jsonRes["certifications"],
        "projects": jsonRes["projects"],
        "trainings": jsonRes["trainigs"],
        "passions": jsonRes["passions"],
        "industryExpertise": jsonRes["industry_expertise"],
        "languages": jsonRes["languages"],
        "awards": jsonRes["awards"],
        "achievements": jsonRes["achievements"],
      }
      return obj
    } catch (error) {
      console.error("Fetch error:", error);
      throw new Error(error.message || error);
    }

  }, []);
};

export default usePDFTextExtracter;



