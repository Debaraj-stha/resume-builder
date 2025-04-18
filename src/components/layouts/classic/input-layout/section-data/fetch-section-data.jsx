import { layout1SeactionData } from "./layout1-section-data";

export const fetchSectionData = (layout_id) => {
    switch (layout_id) {
      case 1:
        console.log("hit 1")
        return layout1SeactionData
      case 2:
        return [
          {
            key: "placeholder",
            content: () => <h1>Hello world</h1>,
          },
        ];
  
      default:
        console.log("hit default")
    }
  }