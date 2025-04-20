import { classicalLayoutById, modernLayoutById } from "./layoutById";
import { useParams } from "react-router-dom";
import { Suspense } from "react";
import { achievements, educations, experiences, personalDetails, summary,skills } from "../../sttaic-data/resume-sample-data";

const LayoutByType = () => {
    const data = {
            personalDetails, educations, summary, experiences, achievements,skills
        }
  const { layout_id, layout_type } = useParams();
  const parsedId = parseInt(layout_id);

  let LayoutComponent;

  switch (layout_type) {
    //getting the layout base on layout types
    case "modern":
      LayoutComponent = modernLayoutById(parsedId);//gttting layout based on layout id
      break;
    default:
      LayoutComponent = classicalLayoutById(parsedId);
  }

  return (
    <Suspense fallback={<div>Loading layout...</div>}>
      <LayoutComponent  />
    </Suspense>
  );
};

export default LayoutByType;
