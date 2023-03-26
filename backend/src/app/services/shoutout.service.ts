import { plainToClass } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { Shoutout } from "../entities/shoutout.entity";
import { AlreadyExistsError } from "../errors/already.exists.error";
import { InvalidItemError } from "../errors/invalid.item.error";
import { QueryParams } from "../models/query.params.model";
import { ShoutoutRepository } from "../repositories/shoutout.repository";
import commonUtilities from "../utilities/common.utilities";
import contactMappingUtilities from "../utilities/contact.mapping.utilities";
import responseFormatter from "../utilities/response.formatter";
import {
  CreateOrUpdateShoutoutModel
} from "../models";

/**
 * Create Or Update experiance
 *
 * @returns void
 */
const createOrUpdateShoutout = async (
  model: CreateOrUpdateShoutoutModel,
  userId: number
) => {
  let employmentEntity: Employment;
  employmentEntity = plainToClass(Employment, model);
  if (!model.id) {
    employmentEntity.userId = userId;
    employmentEntity.isActive = true;
    employmentEntity.createdAt = new Date();
    employmentEntity.createdBy = userId;
  }
  employmentEntity.updatedAt = new Date();
  employmentEntity.updatedBy = userId;
  return await getCustomRepository(EmploymentRepository).createOrUpdate(
    employmentEntity
  );
};

export default {
  createOrUpdateShoutout,
};
