import { layout1SeactionData, layout2sectionData, layout3SectionData } from "./generateLayoutData"

export const fetchSectionData = (layout_id) => {
  switch (layout_id) {
    case 1:
      console.log("hit 1")
      return layout1SeactionData
    case 2:
      return layout2sectionData
    case 3:
      return layout3SectionData
    default:
      console.log("hit default")
      return [
        {
          key: "placeholder",
          content: () => <h1>default layout</h1>,
        },
      ];

  }
}