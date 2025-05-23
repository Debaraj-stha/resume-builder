import React from "react";
import { useFormContext } from "react-hook-form";
import DynamicFieldArray from "./DynamicArrayField";
import { CardWrapper, Input } from "../../CustomComponents";
import { GridOne, GridTwo } from "./GridCards";

const HeaderSection = (props) => {
  const { control, register } = useFormContext();

  const { acceptProfession = false,acceptImage=false } = props;
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
        <Input
          type="text"
          placeholder="Address"
          {...register("personalDetails.address")} // Registering the 'email' field inside 'personalDetails'
        />
        {
          acceptImage && (
            < Input
              type="file"
              {...register("personalDetails.profile")} // Registering the 'email' field inside 'personalDetails'
            />
          )
        }

      </GridTwo>
    </CardWrapper>
  );
};

export default HeaderSection;
