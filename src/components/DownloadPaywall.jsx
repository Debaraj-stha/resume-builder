import { FiCheck, FiLock, FiX } from "react-icons/fi";
import PaymentButton from "./PaymentButton";
import { Link } from "react-router-dom";

const choices = [
  { id: "career_early", name: "Early Career", price: "₹399", note: "60 days unlimited access" },
  { id: "career_experienced", name: "Experienced", price: "₹699", note: "180 days · best value", featured: true },
  { id: "career_leadership", name: "Leadership", price: "₹999", note: "365 days unlimited access" },
  { id: "lifetime", name: "Lifetime", price: "₹2,499", note: "Founding one-time offer" },
];

export default function DownloadPaywall({ onClose, onPaid, feature = "download", title, message }) {
  return <div className="paywall-backdrop" role="presentation"><section className="download-paywall" role="dialog" aria-modal="true" aria-labelledby="download-title">
    <button className="paywall-close" onClick={onClose} aria-label="Close payment options"><FiX /></button>
    <div className="paywall-icon"><FiLock /></div><span>FREE {feature.toUpperCase()} USED</span><h2 id="download-title">{title || "Unlock unlimited career tools"}</h2><p>{message || "You have used the free allowance included with your account. Choose a plan to continue with unlimited premium access."}</p>
    <div className="paywall-benefits"><span><FiCheck /> ATS-ready PDF</span><span><FiCheck /> Unlimited edits during access</span><span><FiCheck /> Secure Razorpay checkout</span></div>
    <div className="paywall-options">{choices.map(choice => <article className={choice.featured ? "featured" : ""} key={choice.id}>{choice.featured ? <em>MOST POPULAR</em> : null}<h3>{choice.name}</h3><strong>{choice.price}</strong><p>{choice.note}</p><PaymentButton planId={choice.id} className="paywall-pay" onSuccess={onPaid}>Unlock premium</PaymentButton></article>)}</div>
    <small>By continuing, you agree to our <Link to="/refund-policy" target="_blank">Refund & Cancellation Policy</Link>.</small>
  </section></div>;
}
