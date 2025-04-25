export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'tenant' | 'landlord' | 'admin';
  contactNumber?: string;
  dateOfBirth?: string;
  idNumber?: string;
  companyName?: string;
  profileCompleted: boolean;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export interface LoginResponse {
  token?: string;
  user?: User;
}

export interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'tenant' | 'landlord';
  contactNumber?: string;
  dateOfBirth?: string;
  idNumber?: string;
  companyName?: string;
  companyType?: 'individual' | 'business';
}