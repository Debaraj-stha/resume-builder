import { Link } from "react-router-dom";
import "../css/legal.css";

const sections = [
  ["1. Scope", "This policy applies to paid digital access plans and professional services purchased directly through ResuAIBuilder."],
  ["2. Cancellation", "The current 30-day, annual and lifetime plans are prepaid access purchases and do not renew automatically. There is therefore no recurring charge to cancel. If recurring subscriptions are introduced later, customers will be able to cancel future renewals while retaining access until the end of the paid billing period."],
  ["3. Seven-day refund window", "You may request a refund within seven calendar days of payment if you have not downloaded a premium PDF and have not consumed any paid expert, AI rewrite or other premium service. Once a premium PDF is downloaded or a paid service is used, the digital service is considered delivered and the purchase is ordinarily non-refundable."],
  ["4. Refunds we will provide", "We will refund verified duplicate charges, payments taken without successful access activation, or a material technical failure that prevents use of the purchased service and cannot be resolved within a reasonable period."],
  ["5. Refunds we ordinarily cannot provide", "Refunds are not normally available for change of mind after download, dissatisfaction caused solely by personal design preference, failure to obtain an interview or job, unused time in a fixed access period, or inaccurate information supplied by the customer."],
  ["6. Lifetime access", "Lifetime means access for the operational lifetime of the ResuAIBuilder service and the purchasing account. It is not transferable and does not guarantee that every future feature or third-party service will be included without an additional charge."],
  ["7. How to request a refund", "Contact us through the Contact page within the applicable period and include the payment ID, registered email address, purchase date and reason. Eligible refunds will be returned to the original payment method, subject to payment-provider processing timelines."],
  ["8. Statutory rights", "Nothing in this policy limits rights available under applicable Indian consumer law, including remedies for deficient services, unfair trade practices or unauthorized charges."],
];

export default function RefundPolicy() {
  return <main className="legal-page"><article><span>LAST UPDATED: 11 AUGUST 2026</span><h1>Refund & Cancellation Policy</h1><p className="legal-intro">We want customers to understand exactly when payment is charged and when a refund is available.</p>{sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<div className="legal-callout"><strong>Before purchasing</strong><p>Please preview your CV, verify its content and review the selected access period. A downloaded PDF normally marks delivery of the digital service.</p></div><Link className="legal-back" to="/pricing">Return to pricing</Link></article></main>;
}
