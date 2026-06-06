export class UserProfileDto {
  id!: string;
  email!: string;
  username!: string;
  status!: string;
  lastLoginAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
