import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, LoginCredentials, RegisterData, UserRole } from '../types/auth';

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    email: 'student@peakhub.com',
    name: 'John Student',
    password: 'password123',
    role: 'student' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=John+Student&background=random'
  },
  {
    id: '2',
    email: 'instructor@peakhub.com',
    name: 'Jane Instructor',
    password: 'password123',
    role: 'instructor' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Jane+Instructor&background=random'
  },
  {
    id: '3',
    email: 'admin@peakhub.com',
    name: 'Admin User',
    password: 'password123',
    role: 'admin' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=random'
  },
  {
    id: '4',
    email: 'moderator@peakhub.com',
    name: 'Mod User',
    password: 'password123',
    role: 'moderator' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Mod+User&background=random'
  },
  {
    id: '5',
    email: 'guest@peakhub.com',
    name: 'Guest User',
    password: 'password123',
    role: 'guest' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Guest+User&background=random'
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<User | null>;
  register: (data: RegisterData) => Promise<User | null>;
  logout: () => void;
}

// Create context without generic type parameters
const AuthContext = createContext(undefined as unknown as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: any; // Using any to bypass type checking
}

// Use function declaration instead of React.FC
export function AuthProvider({ children }: AuthProviderProps) {
  // Initialize state without generic type parameters
  const [user, setUser] = useState(null as User | null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<User | null> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user with matching credentials
    const foundUser = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (foundUser) {
      // Remove password before storing/returning
      const { password, ...safeUser } = foundUser;
      localStorage.setItem('user', JSON.stringify(safeUser));
      setUser(safeUser);
      setIsLoading(false);
      return safeUser;
    }
    
    setIsLoading(false);
    return null;
  };

  const register = async (data: RegisterData): Promise<User | null> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if email already exists
    const existingUser = MOCK_USERS.find(u => u.email === data.email);
    if (existingUser) {
      setIsLoading(false);
      return null;
    }
    
    // Create new user (in a real app this would be done on the server)
    const newUser: User = {
      id: (MOCK_USERS.length + 1).toString(),
      email: data.email,
      name: data.name,
      role: data.role || 'student',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`
    };
    
    // In a real app, we would add this user to the database
    // For now, we'll just pretend it worked and return the user
    
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 