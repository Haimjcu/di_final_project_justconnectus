import { classToPlain, plainToClass } from "class-transformer";
import { appConfig } from "../config";
import { Contact } from "../entities/contact.entity";
import { ContactResponseModel, PhonebookModel } from "../models/contact.models";
import appUtilities from "./app.utilities";

const mapContactEntitiesToModel = (
  contacts: Contact[]
): ContactResponseModel[] => {
  return contacts.map((contact) => {
    const contactEntityModel = classToPlain(contact) as Contact;
    const { user, ...contactModal } = contactEntityModel;
    return {
      ...user,
      contactId: contactModal.id,
      contactStatus: contactModal.status,
    };
  });
};


export default {
  mapContactEntitiesToModel,
};
