export enum USER_STAFF_ROLE {
  SUPER_ADMIN,
  STAFF,
  NULL,
}

export enum USER_GENDER {
  MALE,
  FEMALE,
  OTHERS,
  NULL,
}

export enum USER_RELATION_SHIP_STATUS {
  SINGLE,
  IN_A_RELATIONSHIP,
  MARRIED,
  NULL,
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
  relationshipStatus: USER_RELATION_SHIP_STATUS;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
