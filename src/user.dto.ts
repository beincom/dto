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
  MARRIED = 'ENGAGED',
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

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
