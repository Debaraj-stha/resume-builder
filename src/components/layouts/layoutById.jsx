import { lazy } from "react";

const classicalLayoutById = (layoutId) => {
  //dynamically importing the layouts
  switch (layoutId) {
    case 1:
      console.log("Loading Classical Layout 1");
      return lazy(() => import("./classic/ClassicalLayout1"));
    case 2:
      console.log("Loading Classical Layout 2");
      return lazy(() => import("./classic/ClassicalLayout2"));
    case 3:
      console.log("Loading Classical Layout 3");
      return lazy(() => import("./classic/ClassicalLayout3"));
    default:
      return () => <h1>Default Classical Layout</h1>;
  }
};

const modernLayoutById = (layoutId) => {
  switch (layoutId) {
    case 1:
      return lazy(() => import("./modern/ModernLayout1"));
    case 2:
      return lazy(() => import("./modern/ModernLayout2"));
    case 3:
      return lazy(() => import("./modern/ModernLayout3"));
    default:
      return () => <h1>Default Modern Layout</h1>;
  }
};

export { classicalLayoutById, modernLayoutById };
