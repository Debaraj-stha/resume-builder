import { lazy } from "react";

const classicalLayoutById = (layoutId) => {
  //dynamically importing the layouts
  switch (layoutId) {
    case 1:
      
      return lazy(() => import("./classic/layout-1/layout"));
    case 2:
     
      return lazy(() => import("./classic/layout-2/layout"));
    case 3:
     
      return lazy(() => import("./classic/layout-3/layout"));
    default:
      return () => <h1>Default Classical Layout</h1>;
  }
};

const modernLayoutById = (layoutId) => {
  switch (layoutId) {
    case 1:
      return lazy(() => import("./modern/layout-1/layout"));
    case 2:
      return lazy(() => import("./modern/layout-2/layout"));
    case 3:
      return lazy(() => import("./modern/layout-3/layout"));
    default:
      return () => <h1>Default Modern Layout</h1>;
  }
};

export { classicalLayoutById, modernLayoutById };
