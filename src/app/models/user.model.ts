export enum Role {
  ROLE_USER,
  ROLE_TEACHER,
  ROLE_ADMIN
}

export interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    role?: Role.ROLE_USER;
}
