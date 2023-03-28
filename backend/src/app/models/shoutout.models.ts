export interface ShoutoutModel {
  title?: string;
  description?: string;
  country: string;
  state: string;
  isActive: boolean;
  skills: number[];
}

export interface ShoutoutSkillsModel {
  shoutoutId: number;
  skillId: number;
}

export interface UpdateShoutoutModel {
  id?: number;
  title?: string;
  description?: string;
  country: string;
  state: string;
  isActive: boolean;
  skills: number[];
}


