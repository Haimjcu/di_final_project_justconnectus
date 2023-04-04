import { getCustomRepository } from "typeorm";
import { ConnectStatus, ConnectType } from "../constants/enums";
import { ConnectModel } from "../models/message.models";
import { ConnectsRepository } from "../repositories/connects.repository";
import { SearchMetaRepository } from "../repositories/search.meta.repository";
import { ShoutoutRepository } from "../repositories/shoutout.repository";
import { UserRepository } from "../repositories/user.repository";
import messagesUtilities from "../utilities/messages.utilities";
import searchUtilities from "../utilities/search.utilities";
import shoutoutUtilities from "../utilities/shoutout.utilities";

/**
 * Get Connect Details
 *
 * @returns Connect Details
 */
const getConnectDetails = async (connectId: number, id: number) => {
  const connectDetail = await getCustomRepository(
    ConnectsRepository
  ).getConnectDetail(connectId);
  if(connectDetail.type == ConnectType.SHOUTOUT)
  {return await getShoutoutConnectDetails(connectId, id, connectDetail )}
  else {return await getSearchConnectDetails(connectId, id, connectDetail)}
};

/**
 * Get Connect Details
 *
 * @returns Connect Details
 */
const getSearchConnectDetails = async (connectId: number, id: number, connectDetail:any) => {
  const searchDetail = await getCustomRepository(
    SearchMetaRepository
  ).getSearchDetails(connectDetail.searchMetaId);
  const mappedModel = searchUtilities.mapSearchDetailToModel(searchDetail, id);

  if (connectDetail?.userId) {
    const seekerUser = await getCustomRepository(
      UserRepository
    ).getUserDetailWithSkills(connectDetail?.userId);
    mappedModel.seekerUser = seekerUser;
  }
  if (connectDetail?.connectorId) {
    const connectorUser = await getCustomRepository(
      UserRepository
    ).getUserDetailWithSkills(connectDetail?.connectorId);
    mappedModel.connectorUser = connectorUser;
  }
  if (connectDetail?.providerId) {
    const providerUser = await getCustomRepository(
      UserRepository
    ).getUserDetailWithSkills(connectDetail?.providerId);
    mappedModel.providerUser = providerUser;
  }
  mappedModel.status = connectDetail.status;
  mappedModel.referenceConnectId = connectDetail.referenceConnectId;
  mappedModel.type = connectDetail.type;
  mappedModel.tag =
    connectDetail?.userId === id
      ? connectDetail?.status === ConnectStatus.CONNECTED ||
        connectDetail.status === ConnectStatus.CONNECTOR
        ? "Connector"
        : "Provider"
        : connectDetail?.providerId === id ? "Customer"
      : "Seeker";
  mappedModel.isProvider = connectDetail?.providerId === id;
  mappedModel.isConnector = connectDetail?.connectorId === id;
  mappedModel.isSeeker = connectDetail?.userId === id;
  mappedModel.uuid = connectDetail.uuid;
  mappedModel.id = connectDetail.id;
  return mappedModel;
};

/**
 * Get Shoutout Connect Details
 *
 * @returns Shoutout Details
 */
const getShoutoutConnectDetails = async (connectId: number, id: number, connectDetail:any) => {

  const shoutoutDetail = await getCustomRepository(
    ShoutoutRepository
  ).getShoutoutDetails(connectDetail.shoutoutId);
  const mappedModel = shoutoutUtilities.mapShoutoutDetailToModel(shoutoutDetail, id);

  if (connectDetail?.userId) {
    const seekerUser = await getCustomRepository(
      UserRepository
    ).getUserDetailWithSkills(connectDetail?.userId);
    mappedModel.seekerUser = seekerUser;
  }
  if (connectDetail?.connectorId) {
    const connectorUser = await getCustomRepository(
      UserRepository
    ).getUserDetailWithSkills(connectDetail?.connectorId);
    mappedModel.connectorUser = connectorUser;
  }
  if (connectDetail?.providerId) {
    const providerUser = await getCustomRepository(
      UserRepository
    ).getUserDetailWithSkills(connectDetail?.providerId);
    mappedModel.providerUser = providerUser;
  }
  mappedModel.status = connectDetail.status;
  mappedModel.referenceConnectId = connectDetail.referenceConnectId;
  mappedModel.type = connectDetail.type;
  mappedModel.tag =
        connectDetail?.providerId === id
        ? connectDetail?.status === ConnectStatus.CONNECTED ||
        connectDetail.status === ConnectStatus.CONNECTOR
          ? "Connector"
          : "Shoutouter"
          : connectDetail?.userId === id ? "Jobber"
        : "Jobber";
  mappedModel.isProvider = connectDetail?.providerId === id;
  mappedModel.isConnector = connectDetail?.connectorId === id;
  mappedModel.isSeeker = connectDetail?.userId === id;
  mappedModel.uuid = connectDetail.uuid;
  mappedModel.id = connectDetail.id;
  return mappedModel;
};

/**
 * Create new connect
 *
 * @returns Connect
 */
const createNewConnect = async (connectModel: ConnectModel, id: number) => {
  const connectEntity = messagesUtilities.mapConnectModelToEntities(
    connectModel,
    id
  );
  if (connectModel.connectId) {
    connectEntity.referenceConnectId = connectModel.connectId;
  }
  const connectId = await getCustomRepository(ConnectsRepository).createConnect(
    connectEntity,
    connectModel.connectId
  );
  return await getConnectDetails(connectId, id)
};

/**
 * Create new search
 *
 * @returns chat list
 */
const getChatUsersList = async (id: number) => {
  const list = await getCustomRepository(ConnectsRepository).getConnectUserList(
    id
  );
  const ids = list.map((u: any) => u.userId);
  const users = await getCustomRepository(UserRepository).getBulkUsers(ids);
  return messagesUtilities.mapUsersWithConnectId(users, list);
};

/**
 * Create new search
 *
 * @returns skills
 */
const setConnectToConnected = async (connectId: number, id: number) => {
  await getCustomRepository(ConnectsRepository).update(
    { id: connectId },
    {
      status: ConnectStatus.CONNECTED,
      updatedBy: id,
      updatedAt: new Date(),
    }
  );
  return await getConnectDetails(connectId, id);
};

export default {
  getConnectDetails,
  createNewConnect,
  getChatUsersList,
  setConnectToConnected,
};
