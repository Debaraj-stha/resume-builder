import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const measurementId = String(import.meta.env.VITE_GA_MEASUREMENT_ID || "").trim();

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    if (!document.querySelector('script[data-resuai-analytics]')) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      script.dataset.resuaiAnalytics = "true";
      document.head.appendChild(script);
      window.gtag("js", new Date());
      window.gtag("config", measurementId, { send_page_view: false, anonymize_ip: true });
    }
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    });
  }, [location.pathname, location.search]);

  return null;
}
