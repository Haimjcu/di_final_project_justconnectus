import { classToPlain, plainToClass } from "class-transformer";
import { ConnectStatus, ConnectType } from "../constants/enums";
import { Connects } from "../entities/connects.entity";
import { User } from "../entities/user.entity";
import { ConnectModel } from "../models/message.models";

const mapConnectModelToEntities = (connectModel: ConnectModel, id: number) => {
  let connectEntity = plainToClass(Connects, connectModel);
  connectEntity.createdAt = new Date();
  connectEntity.createdBy = id;
  connectEntity.type = ConnectType.MESSAGE;
  connectEntity.status = connectModel?.connectorId
    ? ConnectStatus.CONNECTOR
    : ConnectStatus.PROVIDER;
  connectEntity.isActive = true;
  connectEntity.shoutoutId
  ? (connectEntity.userId = connectEntity.providerId,
    connectEntity.providerId=id)
  : connectEntity.userId = id;
  return connectEntity;
};

const mapUsersWithConnectId = (users: User[], searchUsers: any) => {
  let userList = classToPlain(users);
  const mappedUserIds = searchUsers.map((searchUser: any) => {
    const user = userList.find((user: any) => searchUser.userId === user.id);
    return {
      ...user,
      connectId: searchUser.connectId,
      connectUuid: searchUser.uuid,
      type: searchUser.type,
      searchMetaId: searchUser.searchMetaId,
    };
  });
  return mappedUserIds;
};

const mapConnectListToIds = (connects: Connects[], id: number) => {
  const mappedSearchWithUserIds = connects.map((meta) => {
    return {
      connectId: meta.id,
      userId:
        meta?.connectorId === id || meta?.providerId === id
          ? meta.userId
          : meta?.status === ConnectStatus.CONNECTED ||
            meta.status === ConnectStatus.CONNECTOR
          ? meta?.connectorId
          : meta?.providerId,
      uuid: meta.uuid,
      searchMetaId: meta.searchMetaId,
      type:
        meta?.userId === id
          ? meta?.status === ConnectStatus.CONNECTED ||
            meta.status === ConnectStatus.CONNECTOR
            ? "Connector"
            : "Provider"
            : meta?.providerId === id ? "Customer"
          : "Seeker",
    };
  });
  return mappedSearchWithUserIds;
};

export default {
  mapConnectModelToEntities,
  mapUsersWithConnectId,
  mapConnectListToIds,
};
