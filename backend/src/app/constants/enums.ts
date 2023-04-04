export enum OperationType {
  DELETE = "DELETE",
  EDIT = "EDIT",
  ADD = "ADD",
}

export enum InviteType {
  PHONEBOOK = "PHONEBOOK",
  EMAIL = "EMAIL",
}

export enum InviteStatus {
  PENDING = "PENDING",
  JOINED = "JOINED",
  REJECTED = "REJECTED",
}

export enum ContactStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum UserStatus {
  CREATED = "CREATED",
  PARTIALLY_COMPLETED = "PARTIALLY_COMPLETED",
  COMPLETED = "COMPLETED",
  TEMP = "TEMP",
  DISABLED = "DISABLED",
}

export enum PhonebookStatus {
  NEW = "NEW",
  JOINED = "JOINED",
}

export enum ConnectStatus {
  CONNECTOR = "CONNECTOR",
  PROVIDER = "PROVIDER",
  CONNECTED = "CONNECTED",
}

export enum ConnectType {
  MESSAGE = "MESSAGE",
  SEARCH = "SEARCH",
  SHOUTOUT = "SHOUTOUT",
}
