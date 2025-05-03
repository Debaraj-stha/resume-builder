import React from "react";
import styled from "styled-components";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CgAdd } from "react-icons/cg";
import { FiDelete } from "react-icons/fi";
import { Button, Input } from "../../CustomComponents"; // Assuming Input component is used
import { useLayout } from "../../../provider/layoutProvider";

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
`;



const EmptyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #aaa;
`;

const DynamicFieldArray = ({ name, placeholder }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const { measured, setMeasured } = useLayout();

  return (
    <Wrapper>
      {fields.length > 0 ? (
        fields.map((field, index) => (
          <Row key={field.id}>
            <Input
              {...register(`${name}[${index}].value`)}  // Correctly register the field path
              placeholder={placeholder}
            />
            <Button type="button" onClick={() => append({ value: "" })}>
              <CgAdd />
            </Button>
            <Button variant="danger" type="button" onClick={() => {
              remove(index);
              setMeasured(false)
            }
            }>
              <FiDelete />
            </Button>
          </Row>
        ))
      ) : (
        <EmptyRow>
          <span>No {placeholder.toLowerCase()} added</span>
          <Button type="button" onClick={() => { append({ value: "" }); setMeasured(false) }}>
            <CgAdd />
          </Button>
        </EmptyRow>
      )}
    </Wrapper>
  );
};

export default DynamicFieldArray;
