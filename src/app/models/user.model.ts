export class User {

  constructor(
    public displayName: string,
    public email: string,
    public photoURL?: string,
    //public role?: string,
    public _id?: string
  ) { }
}
