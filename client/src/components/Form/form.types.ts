export interface IRegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picture: Blob | string;
  location: string;
  occupation: string;
}

export interface ILoginValues {
  email: string;
  password: string;
}
