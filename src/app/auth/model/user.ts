export interface User {
  id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  userId?: string;
}
