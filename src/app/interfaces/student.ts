import { User } from '../interfaces/users';

export interface Student {
  uid: string;
}

export interface StudentWithUser extends User {
  user: User;
}
