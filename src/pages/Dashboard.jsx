import React from "react";
import { Heading, Hspace } from "../components/CustomComponents";
import ClassicalLayout1 from "../components/layouts/classic/layout-1/layout"
import ScrollableModal from "../components/ScrollableModal";
import DashboardHeader from "../components/DashboardHeader";
import ResumeTable from "../components/ResumeTable";

import DeleteModal from "../components/DeleteModal";
import { useDashboard } from "../provider/DashboardProvider";
import Container from "../components/Container";
import { usePagination } from "../provider/paginationProvider";
import Loading from "../components/Loading";




const ResumePreview = React.memo(({ closePreviewModal }) => {
  return (
    <ScrollableModal onClose={closePreviewModal} header={<Heading>Resume Preview</Heading>}>
      <ClassicalLayout1 />
    </ScrollableModal>
  );
});

const Dashboard = () => {

  const {
    isModalShow,
    closePreviewModal,
    isLoading,
    isPreviewShow } = useDashboard()
  const {
    PaginationButtons,
  } = usePagination()

if(isLoading) {
   return <Loading message="Loading dashboard..." />
  }

  return (
    <Container>
      <Hspace />{/*add vertical space because navbar is fixed nad its content is overlapped with navbar*/}
      {/* toots to add,search and sort resumes */}
      <DashboardHeader />
      {/* resumes table */}
      <ResumeTable />  
      {/* pagination buttons */}
      {/* <Pagination /> */}
      {PaginationButtons}

      {isModalShow && <DeleteModal />} {/*show delete modal on button click based on state*/}
      {/* show preview of resume */}
      {isPreviewShow && <ResumePreview closePreviewModal={closePreviewModal} />}
    </Container>
  );
};

export default Dashboard;
