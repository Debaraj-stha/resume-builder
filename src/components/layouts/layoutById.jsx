import { lazy } from "react";

const classicalLayoutById = (layoutId) => {
  //dynamically importing the layouts
  switch (layoutId) {
    case 1:
      return lazy(() => import("../../components/layouts/classic/layout-1/layout"));
    case 2:
      return lazy(() => import("../../components/layouts/classic/layout-2/layout"));
    case 3:
      return lazy(() => import("../../components/layouts/classic/layout-3/layout"));
    case 4:
      return lazy(() => import("../../components/layouts/classic/layout-4/layout"));
    case 5:
      return lazy(() => import("../../components/layouts/classic/layout-5/layout"));
    default:
      return lazy(() => import("../../components/layouts/classic/layout-6/layout"));
  }
};

const modernLayoutById = (layoutId) => {
  switch (layoutId) {
    case 1:
      return lazy(() => import("../../components/layouts/modern/layout-1/layout"));
    case 2:
      return lazy(() => import("../../components/layouts/modern/layout-2/layout"));
    case 3:
      return lazy(() => import("../../components/layouts/modern/layout-3/layout"));
    case 4:
      return lazy(() => import("../../components/layouts/modern/layout-4/layout"));
    case 5:
      return lazy(() => import("../../components/layouts/modern/layout-5/layout"));
    default:
      return lazy(() => import("../../components/layouts/modern/layout-6/layout"));
  }
};
const creativeLayoutById = (layoutId) => {
  switch (layoutId) {
    case 1:
      return lazy(() => import("../../components/layouts/creative/layout-1/layout"));
    case 2:
      return lazy(() => import("../../components/layouts/creative/layout-2/layout"));
    case 3:
      return lazy(() => import("../../components/layouts/creative/layout-3/layout"));
    case 4:
      return lazy(() => import("../../components/layouts/creative/layout-4/layout"));
    default:
      return lazy(() => import("../../components/layouts/creative/layout-5/layout"));

  }
};
const simpleLayoutById = (layoutId) => {
  switch (layoutId) {
    case 1:
      return lazy(() => import("../../components/layouts/simple/layout-1/layout"));
    case 2:
      return lazy(() => import("../../components/layouts/simple/layout-2/layout"));
    case 3:
      return lazy(() => import("../../components/layouts/simple/layout-3/layout"));
    case 4:
      return lazy(() => import("../../components/layouts/simple/layout-4/layout"));
    default:
      return lazy(() => import("../../components/layouts/simple/layout-5/layout"));

  }
};
export { classicalLayoutById, modernLayoutById, creativeLayoutById,simpleLayoutById };
