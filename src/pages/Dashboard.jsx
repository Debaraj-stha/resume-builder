import React, { useState, useCallback, useEffect } from "react";
import { H1, H2, H3 } from "../components/elements/resumeSectionWrapper";
import styled, { useTheme } from "styled-components";
import { resumes as initialResumes } from "../sttaic-data/resumes";
import { Button, Heading, Hspace } from "../components/CustomComponents";
import { BiDownload, BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import ToolTip from "../components/Tooltip";
import Modal from "../components/Modal";
import { BsExclamation, BsEye } from "react-icons/bs";
import RoundedIcon from "../components/RoundedIcon";
import ClassicalLayout1 from "../components/layouts/classic/ClassicalLayout1";
import ScrollableModal from "../components/ScrollableModal";
import DashboardHeader from "../components/DashboardHeader";
import ResumeTable from "../components/ResumeTable";
import Pagination from "../components/Pagination";
import DeleteModal from "../components/DeleteModal";
import { useDashboard } from "../provider/DashboardProvider";
import ErrorModal from "../components/ErrorModal";


const ResumePreview = React.memo(({closePreviewModal}) => {
    return (
      <ScrollableModal onClose={closePreviewModal} header={<Heading>Resume Preview</Heading>}>
        <ClassicalLayout1 />
      </ScrollableModal>
    );
  });
  
const Dashboard = () => {
    const { isModalShow,closePreviewModal,
        isPreviewShow}=useDashboard()

    return (
        <>
            <Hspace />
            <DashboardHeader   />

            <ResumeTable  />

            <Pagination />
       
            {isModalShow && <DeleteModal/>}
            {isPreviewShow && <ResumePreview closePreviewModal={closePreviewModal} />}

        </>
    );
};

export default Dashboard;
