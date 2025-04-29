import React from "react";
import { Hspace } from "./CustomComponents";
import { templateDescription } from "../static-data/template_description";
import { layoutDescription } from "../static-data/layout_description";

import TemplatesdescriptionCard from "./TemplateHeaderCard";
import LayoutCard from "./LayoutCard";
import LayoutDescriptionCard from "./LayoutDescriptionCard";
import TextIconButton from "./IconButton";

import { FaSearchPlus } from "react-icons/fa";
import { useTheme } from "styled-components";

// Sample resume data
import { achievements, educations, experiences, personalDetails, skills, summary, certificates } from "../static-data/resume-sample-data";

// Classical Layout Components
import ClassicalLayout1 from "./layouts/classic/layout-1/layout";
import ClassicalLayout2 from "./layouts/classic/layout-2/layout";
import ClassicalLayout3 from "./layouts/classic/layout-3/layout";
import ClassicalLayout4 from "./layouts/classic/layout-4/layout";
import ClassicalLayout5 from "./layouts/classic/layout-5/layout";
import ClassicalLayout6 from "./layouts/classic/layout-6/layout";
import ModernLayout1 from "./layouts/modern/layout-1/layout";
import ModernLayout2 from "./layouts/modern/layout-2/layout";
import ModernLayout3 from "./layouts/modern/layout-3/layout";
import ModernLayout4 from "./layouts/modern/layout-4/layout"
import ModernLayout5 from "./layouts/modern/layout-5/layout"
import ModernLayout6 from "./layouts/modern/layout-6/layout"
const layoutComponents = [
  // { Component: ClassicalLayout1, titleKey: "Ivy League", descriptionIndex: 0 },
  // { Component: ClassicalLayout2, titleKey: "Timeline", descriptionIndex: 1 },
  // { Component: ClassicalLayout3, titleKey: "Timeline", descriptionIndex: 1 },
  // { Component: ClassicalLayout4, titleKey: "Timeline", descriptionIndex: 1 },
  // { Component: ClassicalLayout5, titleKey: "Ivy League", descriptionIndex: 0 },
  // { Component: ClassicalLayout6, titleKey: "Timeline", descriptionIndex: 1 },
  { Component: ModernLayout1, titleKey: "Timeline", descriptionIndex: 1 },
  { Component: ModernLayout2, titleKey: "Timeline", descriptionIndex: 1 },
  { Component: ModernLayout3, titleKey: "Timeline", descriptionIndex: 1 },
  { Component: ModernLayout4, titleKey: "Timeline", descriptionIndex: 1 },
  { Component: ModernLayout5, titleKey: "Timeline", descriptionIndex: 1 },
  { Component: ModernLayout6, titleKey: "Timeline", descriptionIndex: 1 },
];

const AllLayouts = () => {
  const theme = useTheme();
  const data = { personalDetails, educations, summary, experiences, achievements, skills, certificates };

  return (
    <>
      <Hspace />
      <TemplatesdescriptionCard
        title={templateDescription.all.title}
        description={templateDescription.all.description}
      />
      <div className="grid grid-cols-1 gap-4 overflow-hidden" id="all-templates">
        {layoutComponents.map(({ Component, titleKey, descriptionIndex }, idx) => (
          <LayoutCard key={`layout_card_${idx}`}>
            <Component {...data} />
            <LayoutDescriptionCard
              title={Object.keys(layoutDescription[descriptionIndex])}
              descriptionm={layoutDescription[descriptionIndex][titleKey]}
            />
          </LayoutCard>
        ))}
      </div>
      <div className="py-2">
        <TextIconButton
          icon={<FaSearchPlus color={theme.colors.icons.all_templates.color} />}
          text={"Explore More Layouts"}
          id={"all_templates"}
        />
      </div>
    </>
  );
};

export default AllLayouts;
