enum Role {
  ROLE_USER,
  ROLE_ADMIN
}

export class User {

  constructor(
    public id: string,
    public displayName: string,
    public email: string,
    public photoURL: string = null,
    public role: Role = Role.ROLE_USER
  ) { }
}
