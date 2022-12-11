export enum Role {
  admin = 'admin',
  user = 'user,',
}

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: keyof typeof Role;
  isEmailVerified: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export default UserInterface;
