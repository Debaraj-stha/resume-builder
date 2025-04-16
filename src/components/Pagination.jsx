// Pagination.js
import React from "react";
import { Button } from "../components/CustomComponents";
import { useDashboard } from "../provider/DashboardProvider";

const Pagination = React.memo(() => {
      const {pages,currentPage, handlePageChange}=useDashboard()
  return (
    <div className="flex justify-center items-center content-center gap-3 mt-5">
      {pages.map((_, index) => (
        <Button
          key={index}
          variant={index + 1 === currentPage ? "primary" : "outline"}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  )
});

export default Pagination;
