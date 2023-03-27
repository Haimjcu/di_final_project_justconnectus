import { getCustomRepository } from "typeorm";
import { ShoutoutRepository } from "../repositories/shoutout.repository";
import shoutoutUtilities from "../utilities/shoutout.utilities";
import {ShoutoutModel} from "../models/shoutout.models";
import responseFormatter from "../utilities/response.formatter";

/**
 * Create new Shoutout
 *
 * @returns SearchMeta
 */
const createNewShoutout = async (shoutoutModel: ShoutoutModel, id: number) => {
  const shoutoutEntity = shoutoutUtilities.mapShoutoutToEntities(
    shoutoutModel,
    id
  );
  const shoutoutId = await getCustomRepository(
    ShoutoutRepository
  ).createShoutout(shoutoutEntity);
  return { shoutoutId };
};

/**
 * Get All contacts
 *
 * @returns Request
 */
const getAllShoutouts = async (userId: number) => {
  const {shoutouts} = await getCustomRepository(
    ShoutoutRepository
  ).getShoutouts( userId);
  return responseFormatter.formatResponse(
    shoutouts,
    0,0,0
  );
};

export default {
  createNewShoutout,
  getAllShoutouts,
};
