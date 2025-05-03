import React from "react";
import { useFormContext } from "react-hook-form";
import DynamicFieldArray from "./DynamicArrayField";
import { CardWrapper, Input } from "../../CustomComponents";
import { GridTwo } from "./GridCards";

const HeaderSection = () => {
  const { control, register } = useFormContext();

  return (
    <CardWrapper>
      <GridTwo>
        <Input
          type="text"
          placeholder="Name"
          {...register("personalDetails.name")} // Registering the 'name' field inside 'personalDetails'
        />
        <Input
          type="text"
          placeholder="Profession"
          {...register("personalDetails.profession")} // Registering the 'profession' field inside 'personalDetails'
        />
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
      <GridTwo>
      <DynamicFieldArray
        name="personalDetails.urls" // Registering the 'url' field inside 'personalDetails'
        placeholder="URL"
        control={control}
        register={register}
      />
      </GridTwo>
    </CardWrapper>
  );
};

export default HeaderSection;
