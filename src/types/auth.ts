export type UserRole = 'student' | 'instructor' | 'admin' | 'moderator' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  password?: string; // Only used internally, not exposed to frontend
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}
