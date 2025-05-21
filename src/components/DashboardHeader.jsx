
import React from "react";
import { Button, Hspace } from "../components/CustomComponents";
import { H1 } from "../components/elements/resumeSectionWrapper";
import styled, { useTheme } from "styled-components";
import { useDashboard } from "../provider/DashboardProvider";

const UtilityHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  align-items: center;
  margin: 2rem 0;
`;

const SearchBox = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }
`;

const SortSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  font-size: 1rem;
  transition: all 0.3s ease;
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }
`;

const DashboardHeader = () => {
  const {
    searchQuery,
    handleSearchQuery,
    handleCreate,
    handleSort}=useDashboard()
    const theme=useTheme()
  return (
    <>
    <Hspace height="10px"/>
      <H1 color={theme.colors.text}>All Your Resumes</H1>
      <UtilityHolder>
        <Button onClick={handleCreate}>+ Create New Resume</Button>
        <SearchBox value={searchQuery} onChange={handleSearchQuery} placeholder="Search Here..." />
        <SortSelect onChange={handleSort}>
          <option>Sort By</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </SortSelect>
      </UtilityHolder>
    </>
  )
}

export default DashboardHeader;
