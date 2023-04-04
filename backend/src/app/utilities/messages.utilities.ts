import { classToPlain, plainToClass } from "class-transformer";
import { ConnectStatus, ConnectType } from "../constants/enums";
import { Connects } from "../entities/connects.entity";
import { User } from "../entities/user.entity";
import { ConnectModel } from "../models/message.models";

const mapConnectModelToEntities = (connectModel: ConnectModel, id: number) => {
  let connectEntity = plainToClass(Connects, connectModel);
  connectEntity.createdAt = new Date();
  connectEntity.createdBy = id;
  connectEntity.status = connectModel?.connectorId
    ? ConnectStatus.CONNECTOR
    : ConnectStatus.PROVIDER;
  connectEntity.isActive = true;
  connectEntity.shoutoutId
  ? (connectEntity.userId = connectEntity.providerId,
    connectEntity.providerId=id,
    connectEntity.type = ConnectType.SHOUTOUT)
  : (connectEntity.userId = id,
    connectEntity.type = ConnectType.MESSAGE);
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
        meta?.type == ConnectType.SHOUTOUT ? (
          meta?.connectorId === id ||  meta?.userId === id ? meta.providerId
          : meta?.status === ConnectStatus.CONNECTED ||
            meta.status === ConnectStatus.CONNECTOR
          ? meta?.connectorId
          : meta?.userId
        )
        : (
      // if user is the connector or provider then the chat user is the seeker
      meta?.connectorId === id || meta?.providerId === id ? meta.userId
      // if in connection step then seeker is talking with connector
      : meta?.status === ConnectStatus.CONNECTED ||
        meta.status === ConnectStatus.CONNECTOR
      ? meta?.connectorId
      // else seeker is talking with provider
      : meta?.providerId
        ),
      uuid: meta.uuid,
      searchMetaId: meta.searchMetaId,
      type:
        meta?.type == ConnectType.SHOUTOUT ? (
          meta?.providerId === id
          ? meta?.status === ConnectStatus.CONNECTED ||
            meta.status === ConnectStatus.CONNECTOR
            ? "Connector"
            : "Shoutouter"
            : meta?.userId === id ? "Jobber"
          : "Jobber"
        )
        : (meta?.userId === id
          ? meta?.status === ConnectStatus.CONNECTED ||
            meta.status === ConnectStatus.CONNECTOR
            ? "Connector"
            : "Provider"
            : meta?.providerId === id ? "Customer"
          : "Seeker"),
    };
  });
  return mappedSearchWithUserIds;
};

export default {
  mapConnectModelToEntities,
  mapUsersWithConnectId,
  mapConnectListToIds,
};
