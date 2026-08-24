import { memo, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiCamera, FiImage, FiTrash2 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useLayout } from "../provider/layoutProvider";
import { professionalTemplates } from "../static-data/professional-templates";

const MAX_PHOTO_BYTES = 3 * 1024 * 1024;
const ACCEPTED_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const CandidatePhotoUploader = memo(({ onChoosePhotoFormat }) => {
  const { layout_type, layout_id } = useParams();
  const { setValue } = useFormContext();
  const { liveDetails, setLiveDetails, setMeasured } = useLayout();
  const [error, setError] = useState("");
  const photo = liveDetails?.personalDetails?.profile;
  const preview = typeof photo === "string" ? photo : "";
  const supportsPhoto = useMemo(
    () => professionalTemplates.some((template) => template.photoReady && template.layoutType === layout_type && template.layoutId === Number(layout_id)),
    [layout_id, layout_type]
  );

  const applyPhoto = (value) => {
    setValue("personalDetails.profile", value, { shouldDirty: true, shouldTouch: true });
    setLiveDetails((current) => ({
      ...current,
      personalDetails: { ...(current?.personalDetails || {}), profile: value },
    }));
    setMeasured(false);
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    setError("");
    if (!file) return;
    if (!ACCEPTED_PHOTO_TYPES.has(file.type)) {
      setError("Use a JPG, PNG or WebP photograph.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setError("Please choose a photograph smaller than 3 MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => applyPhoto(String(reader.result || ""));
    reader.onerror = () => setError("This photograph could not be read. Please try another image.");
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removePhoto = () => applyPhoto("");

  return (
    <section className={`candidate-photo-card ${supportsPhoto ? "photo-ready" : "photo-format-required"}`} aria-labelledby="candidate-photo-heading">
      <div className="candidate-photo-icon">
        {preview ? <img src={preview} alt="Candidate CV portrait preview" /> : <FiCamera aria-hidden="true" />}
      </div>
      <div className="candidate-photo-copy">
        <span>OPTIONAL CV PORTRAIT</span>
        <h2 id="candidate-photo-heading">Add candidate photograph</h2>
        <p>{supportsPhoto ? "Upload a professional headshot and see it immediately in this CV format." : "This ATS-first format intentionally omits photographs. Select a photo-compatible GCC format to add one."}</p>
        <small>JPG, PNG or WebP · Maximum 3 MB · Recommended for GCC applications; usually omit for US/UK roles.</small>
        {error ? <strong className="candidate-photo-error" role="alert">{error}</strong> : null}
      </div>
      <div className="candidate-photo-actions">
        {supportsPhoto ? (
          <label className="candidate-photo-upload">
            <FiImage aria-hidden="true" /> {preview ? "Replace photo" : "Upload photo"}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} />
          </label>
        ) : (
          <button type="button" onClick={onChoosePhotoFormat}><FiImage aria-hidden="true" /> Choose photo format</button>
        )}
        {preview ? <button type="button" className="candidate-photo-remove" onClick={removePhoto}><FiTrash2 aria-hidden="true" /> Remove</button> : null}
      </div>
    </section>
  );
});

CandidatePhotoUploader.displayName = "CandidatePhotoUploader";

export default CandidatePhotoUploader;
