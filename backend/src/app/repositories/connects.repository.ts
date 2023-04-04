import {
  EntityRepository,
  getManager,
  getRepository,
  Repository,
} from "typeorm";
import { ConnectStatus, ConnectType } from "../constants/enums";
import { Connects } from "../entities/connects.entity";
import messagesUtilities from "../utilities/messages.utilities";

@EntityRepository(Connects)
export class ConnectsRepository extends Repository<Connects> {
  public async createConnect(
    connectEntity: Connects,
    connectorConnectId?: number
  ) {
    try {
      return await getManager().transaction(
        async (transactionalEntityManager) => {
          const response = await transactionalEntityManager.insert(
            Connects,
            connectEntity
          );
          if (connectorConnectId) {
            await transactionalEntityManager.update(
              Connects,
              { id: connectorConnectId },
              { referenceConnectId: response.raw.insertId }
            );
          }
          return response.raw.insertId;
        }
      );
    } catch (error) {
      throw error;
    }
  }

  public async getConnectDetail(chatId: number) {
    const connectDetail = await getRepository(Connects).findOne(chatId);
    return connectDetail;
  }

  public async getConnectUserList(id: number) {
    const chatUsers = await getRepository(Connects)
      .createQueryBuilder(Connects.name)
      .where(
        `(${Connects.name}.user_id = :id and ${Connects.name}.type = :message) 
         or (${Connects.name}.user_id = :id and ${Connects.name}.type = :shoutout and ${Connects.name}.status = :status)
         or ${Connects.name}.connector_id = :id 
         or (${Connects.name}.provider_id = :id and ${Connects.name}.type = :shoutout)
         or (${Connects.name}.provider_id = :id and  ${Connects.name}.status = :status)`,
        {
          id,
          status: ConnectStatus.PROVIDER,
          shoutout: ConnectType.SHOUTOUT,
          message: ConnectType.MESSAGE
        }
      )
      .orderBy(`${Connects.name}.id`, "DESC")
      .getMany();
    return messagesUtilities.mapConnectListToIds(chatUsers, id);
  }
}
