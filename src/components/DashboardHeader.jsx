
import React from "react";
import { Button, Hspace } from "../components/CustomComponents";
import styled from "styled-components";
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
  return (
    <div className="library-header">
      <div className="library-heading"><span>YOUR LIBRARY</span><h2>My resumes</h2><p>Manage every version created for your job applications.</p></div>
      <UtilityHolder>
        <SearchBox value={searchQuery} onChange={handleSearchQuery} placeholder="Search resumes..." />
        <SortSelect onChange={handleSort}>
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </SortSelect>
        <Button onClick={handleCreate}>+ New resume</Button>
      </UtilityHolder>
    </div>
  )
}

export default DashboardHeader;
