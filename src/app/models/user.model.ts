export enum Role {
  ROLE_USER,
  ROLE_TEACHER,
  ROLE_ADMIN
}

// TODO: Eliminar opcional los parámetros "photoURL", "role" i "course"
export interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    role?: Role.ROLE_USER;
    course?: string;
}
