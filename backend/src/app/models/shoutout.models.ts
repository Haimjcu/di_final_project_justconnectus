export interface ShoutoutModel {
  createdBy?: any;
  updatedBy?: number;
  createdAt: Date;
  updatedAt?: Date;
  id: number;
  title?: string;
  description?: string;
  country: string;
  state: string;
  isActive: boolean;
}

export interface ShoutoutSkillsModel {
  createdBy?: any;
  updatedBy?: number;
  createdAt: Date;
  updatedAt?: Date;
  id: number;
  shoutoutId: number;
  skillId: number;
}

export interface CreateOrUpdateShoutoutModel {
  id?: string;
  title: string;
  description: string;
  fromMonth: number;
  fromYear: number;
  toMonth: number;
  toYear: number;
  isCurrent: boolean;
  country: string;
  companyWebsite: string;
}


