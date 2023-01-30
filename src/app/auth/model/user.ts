export interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  userId?: string;
}
