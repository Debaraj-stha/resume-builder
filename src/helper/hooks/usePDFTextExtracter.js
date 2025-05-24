
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
      const obj={
        personalDetails:{
          name:jsonRes["name"],
          email:jsonRes["email"],
          phone:jsonRes["phone"]
        }
      }
      return jsonRes

    } catch (error) {
      console.error("Fetch error:", error);
      throw new Error(error.message || error);
    }

  }, []);
};

export default usePDFTextExtracter;



