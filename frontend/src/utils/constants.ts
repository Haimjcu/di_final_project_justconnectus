import { optionType } from "@Store/common/type";

export const THUMBNAIL_SIZE_LIMIT = 2048000;
export const LIST_IMAGE_SIZE_LIMIT = 4096000;
export const dateTimeFormat = "DD/MM/YYYY HH:mm:ss";
export const dateFormat = "DD/MM/YYYY";
export const DRAWER_WIDTH = 270;
export const COLLAPSED_DRAWER_WIDTH = 100;
export const ACCEPTED_IMAGE_TYPES = ".jpeg, .jpg, .png";
export const STOREWIDE_BANNER_ASPECT_RATIO = 360 / 176;
export const CATEGORY_BANNER_ASPECT_RATIO = 656 / 128;
export const STORY_IMAGE_ASPECT_RATIO = 9 / 16;
export const WAREHOUSE_CODE_PREFIX = "WH-";

export const responseType = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

export const visibilityEnum = {
  VISIBLE: "VISIBLE",
  HIDE: "HIDDEN",
};

export enum sortOrder {
  ASC = "asc",
  DESC = "desc",
}

export const rangeEnums = {
  FROM: "from",
  TO: "to",
};

export const nameDescLengths = {
  TITLE_LEN_MAX: 24,
  DESC_LEN_MAX: 72,
};

export enum Breakpoints {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ModalType {
  USER_INRODUCTION = "userInroductionModal",
  WORK_EXPERIENCE_MODAL = "workExperienceModal",
  GENERAL_INFORMATION_MODAL = "generalInformationModal",
  CONTACT_INFORMATION_MODAL = "contactInformationModal",
  SKILLS_MODAL = "skillsModal",
  EDUCATION_MODAL = "educationModal",
  ADD_LINK_MODAL = "addLinkModal",
  MOBILE_MENU_MODAL = "mobileMenuModal",
  CONFIRMATION_MODAL = "confirmationModal",
  PUBLIC_PROFILE = "publicProfileModal",
  SHOUTOUT_MODAL = "shoutoutModal",
  JOB_MODAL = "jobModal",
}

export enum reportTypeOptions {
  CONFIRMED_DATE = "CONFIRMED_DATE",
  CREATED_DATE = "CREATED_DATE",
}

export const statusEnum = {
  RECEIVED: "RECEIVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  COMPLETED: "COMPLETED",
  SUCCESS: "SUCCESS",
  OPEN: "OPEN",
  BILLED: "BILLED",
  PAID: "PAID",
  CLOSED: "CLOSED",
  ACTIVE_STATUS: "active",
  INACTIVE_STATUS: "inactive",
  ALL: "all",
  SELECT_OPTION: "select-option",
  REMOVE_OPTION: "remove-option",
  PENDING_STATUS: "pending",
  YES: "YES",
  NO: "NO",
  FAILED: "FAILED",
  APPROVED: "APPROVED",
  CREATED: "CREATED",
  SENT: "SENT",
  ACCEPTED: "ACCEPTED",
  DRAFT: "DRAFT",
  VERIFIED: "VERIFIED",
  RESET: "RESET",
  UNVERIFIED: "UNVERIFIED",
  DONE: "Done",
  IN_PROGRESS: "IN_PROGRESS",
  ATTEMPTING: "ATTEMPTING",
  PENDING: "PENDING",
  SCHEDULED: "SCHEDULED",
};

export enum daysEnum {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

export const days: string[] = [
  daysEnum.SUNDAY,
  daysEnum.MONDAY,
  daysEnum.TUESDAY,
  daysEnum.WEDNESDAY,
  daysEnum.THURSDAY,
  daysEnum.FRIDAY,
  daysEnum.SATURDAY,
];

export const months: optionType[] = [
  { value: "", label: "Month" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export const generateArrayOfYears = () => {
  const max = new Date().getFullYear();
  const min = max - 49;
  const years = [];
  years.push(0);

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case "Seeker":
      return { color: "#4884ED", backgroundColor: "#F0F5FE" };
    case "Customer":
      return { color: "#4884ED", backgroundColor: "#F0F5FE" };
    case "Connector":
      return { color: "#26B69F", backgroundColor: "#E9F9F6" };
    case "Provider":
      return { color: "#F89F00", backgroundColor: "#FEF5E5" };
    default:
      return { color: "#4884ED", backgroundColor: "#F0F5FE" };
  }
};

export enum columnDataTypesEnum {
  PRICE = "price",
  NUMBER = "number",
  OBJECT = "object",
}

export enum InviteType {
  PHONEBOOK = "PHONEBOOK",
  EMAIL = "EMAIL",
}

export enum SearchType {
  COMMUNITY = "community",
  CONNECTION = "connection",
}

export enum ConnectStatus {
  CONNECTOR = "CONNECTOR",
  PROVIDER = "PROVIDER",
  CONNECTED = "CONNECTED",
}

export enum UserStatus {
  CREATED = "CREATED",
  PARTIALLY_COMPLETED = "PARTIALLY_COMPLETED",
  COMPLETED = "COMPLETED",
  TEMP = "TEMP",
  DISABLED = "DISABLED",
}

export enum ShoutoutStatus {
  UPDATE = "UPDATE",
  CREATE = "CREATE",
}