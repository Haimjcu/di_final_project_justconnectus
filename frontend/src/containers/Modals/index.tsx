import { initialState } from "@Store/rootReducer";
import { ModalType } from "@Utils/constants";
import React from "react";
import { connect } from "react-redux";

import AddSkills from "./AddSkills";
import AddUpdateLink from "./AddUpdateLink";
import ContactInfo from "./ContactInfo";
import EducationModal from "./EducationModal";
import ExperienceModal from "./ExperienceModal";
import MobileMenuModal from "./MobileMenuModal";
import PublicProfile from "./PublicProfile";
import UpdateUserInfo from "./UpdateUserInfo";
import UserIntroduction from "./UserIntroduction";
import ShoutoutModal from "./ShoutoutModal";
import JobModal from "./JobModal";

const Modals = (props: any) => {
  const { modal } = props;
  return (
    <>
      {modal[ModalType.USER_INRODUCTION] ? <UserIntroduction /> : null}
      {modal[ModalType.GENERAL_INFORMATION_MODAL] ? <UpdateUserInfo /> : null}
      {modal[ModalType.SKILLS_MODAL] ? <AddSkills /> : null}
      {modal[ModalType.CONTACT_INFORMATION_MODAL] ? <ContactInfo /> : null}
      {modal[ModalType.EDUCATION_MODAL] ? <EducationModal /> : null}
      {modal[ModalType.WORK_EXPERIENCE_MODAL] ? <ExperienceModal /> : null}
      {modal[ModalType.ADD_LINK_MODAL] ? <AddUpdateLink /> : null}
      {modal[ModalType.MOBILE_MENU_MODAL] ? <MobileMenuModal /> : null}
      {modal[ModalType.PUBLIC_PROFILE] ? <PublicProfile /> : null}
      {modal[ModalType.SHOUTOUT_MODAL] ? <ShoutoutModal /> : null}
      {modal[ModalType.JOB_MODAL] ? <JobModal /> : null}
    </>
  );
};

const mapStateToProps = (state: typeof initialState) => ({
  modal: state.ui.modal,
});

export default connect(mapStateToProps, null)(Modals);
