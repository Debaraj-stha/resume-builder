import { FiCheck, FiLock, FiX } from "react-icons/fi";
import PaymentButton from "./PaymentButton";
import { Link } from "react-router-dom";

const choices = [
  { id: "monthly", name: "Monthly", price: "₹199", note: "Best for one job search" },
  { id: "annual", name: "Annual", price: "₹999", note: "Best value", featured: true },
  { id: "lifetime", name: "Lifetime", price: "₹2,499", note: "Founding one-time offer" },
];

export default function DownloadPaywall({ onClose, onPaid }) {
  return <div className="paywall-backdrop" role="presentation"><section className="download-paywall" role="dialog" aria-modal="true" aria-labelledby="download-title">
    <button className="paywall-close" onClick={onClose} aria-label="Close payment options"><FiX /></button>
    <div className="paywall-icon"><FiLock /></div><span>FREE DOWNLOAD USED</span><h2 id="download-title">Choose access for additional professional PDFs</h2><p>Your first watermark-free CV download was free. Select a plan for additional tailored versions and downloads.</p>
    <div className="paywall-benefits"><span><FiCheck /> ATS-ready PDF</span><span><FiCheck /> Unlimited edits during access</span><span><FiCheck /> Secure Razorpay checkout</span></div>
    <div className="paywall-options">{choices.map(choice => <article className={choice.featured ? "featured" : ""} key={choice.id}>{choice.featured ? <em>MOST POPULAR</em> : null}<h3>{choice.name}</h3><strong>{choice.price}</strong><p>{choice.note}</p><PaymentButton planId={choice.id} className="paywall-pay" onSuccess={onPaid}>Pay & download</PaymentButton></article>)}</div>
    <small>By continuing, you agree to our <Link to="/refund-policy" target="_blank">Refund & Cancellation Policy</Link>.</small>
  </section></div>;
}
