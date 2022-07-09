import { ROLE_USER } from "../global/constants";


export class User {

  constructor(
    public id: string,
    public displayName: string,
    public email: string,
    public role: string = ROLE_USER,
    public photoURL: string = null,
  ) { }
}
