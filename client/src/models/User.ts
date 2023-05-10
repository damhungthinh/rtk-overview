export interface User {
  id: number;
  email: string;
  name: string;
}

export interface UserQueryParams {
  // filter values
  q: string;
}

export interface UserModalPayload {
  type: "add" | "edit";
  payload: any;
}

export interface UserState {
  filterValue?: string;

  modal?: UserModalPayload;
}

export interface UserForm {
  email: string;
  name: string;
  [x: string]: string;
}
