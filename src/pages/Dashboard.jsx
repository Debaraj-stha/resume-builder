import React from "react";
import { Heading, Hspace } from "../components/CustomComponents";
import ClassicalLayout1 from "../components/layouts/classic/ClassicalLayout1";
import ScrollableModal from "../components/ScrollableModal";
import DashboardHeader from "../components/DashboardHeader";
import ResumeTable from "../components/ResumeTable";
import Pagination from "../components/Pagination";
import DeleteModal from "../components/DeleteModal";
import { useDashboard } from "../provider/DashboardProvider";
import Container from "../components/Container";



const ResumePreview = React.memo(({ closePreviewModal }) => {
  return (
    <ScrollableModal onClose={closePreviewModal} header={<Heading>Resume Preview</Heading>}>
      <ClassicalLayout1 />
    </ScrollableModal>
  );
});

const Dashboard = () => {
  const { isModalShow, closePreviewModal,
    isPreviewShow } = useDashboard()

  return (
    <Container>
      <Hspace />{/*add vertical space because navbar is fixed nad its content is overlapped with navbar*/}
      {/* toots to add,search and sort resumes */}
      <DashboardHeader />
      {/* resumes table */}
      <ResumeTable />
      {/* pagination buttons */}
      <Pagination />

      {isModalShow && <DeleteModal />} {/*show delete modal on button click based on state*/}
      {/* show preview of resume */}
      {isPreviewShow && <ResumePreview closePreviewModal={closePreviewModal} />}
    </Container>
  );
};

export default Dashboard;
