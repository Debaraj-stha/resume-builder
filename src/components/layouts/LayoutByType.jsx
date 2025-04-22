import { classicalLayoutById, modernLayoutById } from "./layoutById";
import { useParams } from "react-router-dom";
import { Suspense, useMemo } from "react";
import {
  achievements,
  educations,
  experiences,
  personalDetails,
  summary,
  skills,
} from "../../static-data/resume-sample-data";

const LayoutByType = () => {
  const { layout_id, layout_type } = useParams();
  const parsedId = parseInt(layout_id);

  const data = {
    personalDetails,
    educations,
    summary,
    experiences,
    achievements,
    skills,
  };

  const LayoutComponent = useMemo(() => {
    if (layout_type === "modern") {
      return modernLayoutById(parsedId);
    }
    return classicalLayoutById(parsedId);
  }, [layout_type, parsedId]);

  return (
    <Suspense fallback={<div>Loading layout...</div>}>
      <LayoutComponent  shouldMeasureHeight={true}/>
    </Suspense>
  );
};

export default LayoutByType;
