import { useCallback } from "react"
import { useNavigate } from "react-router-dom"



export const useGetStarted = () => {
  const navigate = useNavigate();
  return useCallback(() => {
    navigate("/templates");
  }, [navigate]);
};
