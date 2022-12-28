import { BeinStaffRole } from './staff-role.dto';

export class UserDto {
  id: string;
  username: string;
  fullname: string;
  email: string;
  avatar: string;
  chatId: string;

  beinStaffRole: BeinStaffRole;
  countryCode: string;
  country: string;
  city: string;
  address: string;
  backgroundImgUrl: string;
  birthday: Date;
  description: string;
  gender: any;
  language: string[];
  phone: string;
  relationshipStatus: any;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
