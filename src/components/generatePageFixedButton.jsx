import { memo, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { MdPalette } from "react-icons/md";
import { useLayout } from "../provider/layoutProvider";
import { useSupabase } from "../provider/supabaseProvider";
import { useAuth } from "../provider/AuthProvider";
import { claimFreeDownload, hasDownloadAccess } from "../services/payments";
import { CircularIconHolder } from "./elements/resumeSectionWrapper";
import ToolTip from "./Tooltip";
import ProgressBarModal from "./ModalWithProgressBar";
import FixedIconWrapper from "./FixedIconWrapper";
import DownloadPaywall from "./DownloadPaywall";
import { TESTING_ACCESS_ENABLED } from "../config/testingAccess";

const GeneratePageFixedButtons = memo(
  ({ setShowIcons, showIcons, setIsTemplateChangeModelOpen }) => {
    const [fileGenerating, setFileGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isPaywallOpen, setIsPaywallOpen] = useState(false);
    const [downloadError, setDownloadError] = useState("");

    const { generatePDF } = useLayout();
    const { user } = useAuth();
    const { uploadFile } = useSupabase();

    const createCompletePDF = async () => {
      setFileGenerating(true);
      setDownloadError("");

      try {
        const file = await generatePDF("healthcare-");
        if (!file || file.size < 1_000) {
          throw new Error("The generated PDF was unexpectedly empty.");
        }
        return file;
      } catch (error) {
        console.error("Error while generating the complete CV", error);
        setDownloadError("We could not prepare your full CV. Please try again in a moment.");
        return null;
      } finally {
        setFileGenerating(false);
      }
    };

    const deliverFile = async (file) => {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2_000);

      try {
        await uploadFile(file, setProgress);
      } catch (error) {
        // A cloud backup failure should never block the local download.
        console.error("CV backup upload failed", error);
      } finally {
        setProgress(0);
      }
    };

    const handleDownloadClick = async () => {
      if (!user?.id) {
        window.location.href =
          "/login?redirectTo=" + encodeURIComponent(window.location.pathname);
        return;
      }

      // A failed render should never consume the user's free download.
      const file = await createCompletePDF();
      if (!file) return;

      if (TESTING_ACCESS_ENABLED) {
        await deliverFile(file);
        return;
      }

      if (await hasDownloadAccess()) {
        await deliverFile(file);
        return;
      }

      try {
        const freeAccess = await claimFreeDownload();
        if (freeAccess.granted) await deliverFile(file);
        else setIsPaywallOpen(true);
      } catch {
        setIsPaywallOpen(true);
      }
    };

    const handlePaidDownload = async () => {
      setIsPaywallOpen(false);
      const file = await createCompletePDF();
      if (file) await deliverFile(file);
    };

    return (
      <>
        <FixedIconWrapper showIcons={showIcons} setShowIcons={setShowIcons}>
          {showIcons && (
            <>
              <ToolTip text="Download complete PDF">
                <CircularIconHolder backgroundColor="#168a70" onClick={handleDownloadClick}>
                  <FaDownload color="white" />
                </CircularIconHolder>
              </ToolTip>
              <ToolTip text="Try another template">
                <CircularIconHolder
                  backgroundColor="#6750a4"
                  onClick={() => setIsTemplateChangeModelOpen(true)}
                >
                  <MdPalette color="white" />
                </CircularIconHolder>
              </ToolTip>
            </>
          )}
        </FixedIconWrapper>

        {fileGenerating && (
          <ProgressBarModal progress={progress} onClose={() => setFileGenerating(false)} />
        )}
        {downloadError && (
          <div className="download-error-toast" role="alert">
            <span>{downloadError}</span>
            <button type="button" onClick={() => setDownloadError("")} aria-label="Dismiss message">
              ×
            </button>
          </div>
        )}
        {isPaywallOpen && (
          <DownloadPaywall onClose={() => setIsPaywallOpen(false)} onPaid={handlePaidDownload} />
        )}
      </>
    );
  }
);

GeneratePageFixedButtons.displayName = "GeneratePageFixedButtons";

export default GeneratePageFixedButtons;
