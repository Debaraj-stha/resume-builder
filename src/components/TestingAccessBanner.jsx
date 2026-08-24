import { FiCheckCircle } from "react-icons/fi";
import { TESTING_ACCESS_ENABLED } from "../config/testingAccess";

export default function TestingAccessBanner() {
  if (!TESTING_ACCESS_ENABLED) return null;

  return (
    <aside className="testing-access-banner" role="status">
      <FiCheckCircle aria-hidden="true" />
      <span><strong>Testing access is open:</strong> all premium feature limits and repeat downloads are temporarily unlocked for validation.</span>
    </aside>
  );
}
