import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

function RedirectMessagePage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectTo = params.get("redirectTo") || "/login"; // default fallback

    const timer = setTimeout(() => {
      navigate(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <div className="m-auto py-5 text-center">
      <Loading message="Redirecting to login page..." />
    </div>
  );
}

export default RedirectMessagePage;
