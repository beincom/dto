export enum USER_STAFF_ROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  STAFF = 'STAFF',
}

export enum USER_GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
}

export enum USER_RELATIONSHIP_STATUS {
  SINGLE = 'SINGLE',
  IN_A_RELATIONSHIP = 'IN_A_RELATIONSHIP',
  ENGAGED = 'ENGAGED',
  MARRIED = 'MARRIED',
}

export class UserDto {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  chatId: string;

  beinStaffRole: USER_STAFF_ROLE;
  countryCode: string;
  country: string;
  city: string;
  address: string;
  backgroundImgUrl: string;
  birthday: Date;
  description: string;
  gender: USER_GENDER;
  language: string[];
  phone: string;
  relationshipStatus: USER_RELATIONSHIP_STATUS;
  isDeactivated: boolean;
  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface SharedUserDto {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  email: string;
  isDeactivated: boolean;
  isVerified: boolean;
  blockings: string[];
  groups: string[];
}


export class UserPublicInfoDto {
  fullname: string;
  avatar: string;
}

export class UserBasicInfo extends UserPublicInfoDto {
  id: string;
  username: string;
}

export const SHARED_USER_KEY_PREFIX = 'SU';
