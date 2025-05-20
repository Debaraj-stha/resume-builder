import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Button } from "../components/CustomComponents";
import ToolTip from "../components/Tooltip";

const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemsPerPage] = useState(3);
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState([]);
  const [itemsLength, setItemsLength] = useState(0);

  const computePages = useCallback(() => {
    if (itemPerPage === 0) return;

    const pageCount = itemsLength || items.length;
    const totalPagesCount = Math.ceil(pageCount / itemPerPage);
    const totalPages = Array.from({ length: totalPagesCount }, (_, i) => i + 1);
    setPages(totalPages);

  }, [items, itemPerPage, itemsLength]);

  const handlePageChange = useCallback((page) => {
    console.log("page change", page)
    if (page === currentPage) return; // Prevent updating if already on that page
    setCurrentPage(page);
  }, [currentPage]);


  const PaginationButtons = useMemo(() => (
    <div className="flex justify-center items-center content-center mt-5">
      <ToolTip text="Previous Page">
        <Button disabled={currentPage == 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
      </ToolTip>

      {pages.map((_, index) => (

        <Button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          margin="5px"
          backgroundColor={index + 1 === currentPage ? "" : "transparent"}
          borderColor={index + 1 === currentPage ? "" : "white"}
        >
          {index + 1}
        </Button>

      ))}
      <ToolTip text='Next page'>
        <Button disabled={currentPage == pages.length} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
      </ToolTip>
    </div>
  ), [pages, currentPage, handlePageChange]);

  useEffect(() => {
    computePages();
  }, [computePages, itemsLength]); //  Re-run whenever itemsLength updates


  const contextValues = useMemo(() =>({
    currentPage,
      handlePageChange,
      PaginationButtons,
      setItemsPerPage,
      setItems,
      setItemsLength,
      itemPerPage,
      itemsLength,
      pages
  }),[currentPage,
    handlePageChange,
    PaginationButtons,
    setItemsPerPage,
    setItems,
    setItemsLength,
    itemPerPage,
    itemsLength,
    pages,])

  return (
    <PaginationContext.Provider value={contextValues}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => useContext(PaginationContext);
