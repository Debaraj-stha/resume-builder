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
  const parsedId = parseInt(layout_id, 10);

  const layoutElement = useMemo(() => {
    if (layout_type === layout_type_map.MODERN) {
      const Comp = modernLayoutById(parsedId);
     
      return <Comp shouldMeasureHeight={true} key={`${layout_type}-${layout_id}`} />;
    }
    if (layout_type === layout_type_map.CREATIVE) {
      const Comp = creativeLayoutById(parsedId);
      
      return <Comp shouldMeasureHeight={true} key={`${layout_type}-${layout_id}`} />;
    }
    if (layout_type === layout_type_map.SIMPLE) {
      const Comp = simpleLayoutById(parsedId);
     
      return <Comp shouldMeasureHeight={true} key={`${layout_type}-${layout_id}`} />;
    }

    const Comp = classicalLayoutById(parsedId);
  
    return <Comp shouldMeasureHeight={true} key={`${layout_type}-${layout_id}`} />;
  }, [layout_type, parsedId]);

  return (
    <Suspense fallback={<Loading message="Preparing Input fields" />}>
      {layoutElement}
    </Suspense>
  );
};

export default LayoutByType;
