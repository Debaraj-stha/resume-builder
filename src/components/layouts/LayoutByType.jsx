import { classicalLayoutById, creativeLayoutById, modernLayoutById, simpleLayoutById } from "./layoutById";
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
import { layout_type_map } from "../../constant";
import Loading from "../Loading"

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
    if (layout_type === layout_type_map.MODERN) {
      return modernLayoutById(parsedId);
    }
    if (layout_type === layout_type_map.CREATIVE) {
      return creativeLayoutById(parsedId)
    }
    if (layout_type === layout_type_map.SIMPLE) {
      return simpleLayoutById(parsedId)
    }
    return classicalLayoutById(parsedId);
  }, [layout_type, parsedId]);

  return (
    <Suspense fallback={<Loading message="Preparing Input fields"/>}>
      <LayoutComponent shouldMeasureHeight={true} />
    </Suspense>
  );
};

export default LayoutByType;
