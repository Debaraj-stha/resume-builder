import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import DynamicFieldArray from "./DynamicArrayField";
import { CardWrapper, Input } from "../../CustomComponents";
import { GridOne, GridTwo } from "./GridCards";

const HeaderSection = (props) => {
  const { control, register, setValue } = useFormContext();
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoError, setPhotoError] = useState("");
  const { acceptProfession = true, acceptImage = true, shouldAcceptAddress = true } = props;
  return (
    <CardWrapper>
      <GridTwo>
        <Input
          type="text"
          placeholder="Name"
          {...register("personalDetails.name")} // Registering the 'name' field inside 'personalDetails'
        />
        {
          acceptProfession && <Input
            type="text"
            placeholder="Profession"
            {...register("personalDetails.profession")} // Registering the 'profession' field inside 'personalDetails'
          />
        }

        <Input
          type="text"
          placeholder="Phone"
          {...register("personalDetails.phone")} // Registering the 'phone' field inside 'personalDetails'
        />
        <Input
          type="text"
          placeholder="Email"
          {...register("personalDetails.email")} // Registering the 'email' field inside 'personalDetails'
        />
      </GridTwo>
      <GridOne>
        <DynamicFieldArray
          name="personalDetails.urls" // Registering the 'url' field inside 'personalDetails'
          placeholder="URL"
          control={control}
          register={register}
        />
      </GridOne>
      <GridTwo>
        {
          shouldAcceptAddress &&

          <Input
            type="text"
            placeholder="Address"
            {...register("personalDetails.address")} // Registering the 'email' field inside 'personalDetails'
          />
        }
        {
          acceptImage && <div className="cv-photo-field">
            <label htmlFor="cv-profile-photo"><strong>Professional photo <small>Optional</small></strong><span>Recommended for GCC applications; usually omit for US/UK applications.</span></label>
            <input id="cv-profile-photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => {
              const file = event.target.files?.[0];
              setPhotoError("");
              if (!file) return;
              if (file.size > 3 * 1024 * 1024) { setPhotoError("Please choose an image smaller than 3 MB."); event.target.value = ""; return; }
              const reader = new FileReader();
              reader.onload = () => setPhotoPreview(String(reader.result || ""));
              reader.readAsDataURL(file);
              setValue("personalDetails.profile", event.target.files, { shouldDirty: true, shouldTouch: true });
            }}/>
            {photoPreview ? <div className="cv-photo-preview"><img src={photoPreview} alt="Selected CV portrait"/><button type="button" onClick={() => { setPhotoPreview(""); setValue("personalDetails.profile", [], { shouldDirty: true }); }}>Remove photo</button></div> : null}
            {photoError ? <small className="cv-photo-error">{photoError}</small> : null}
          </div>
        }

      </GridTwo>
    </CardWrapper>
  );
};

export default HeaderSection;
