export interface ICreateUserPayload {
  user_id: string;
  email: string;
  display_name: string;
}

export interface IUserProfile {
  user_id: string;
  email: string;
  display_name: string;
  bio?: string;
}
export interface IRegisterResult {
  user_id: string;
  email: string;
  role: string;
  profile: IUserProfile;
  message: string;
}
