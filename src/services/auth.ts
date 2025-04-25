import { LoginResponse, RegisterUserData, User } from '../types/auth';

// Simulated API endpoints for auth services
// In a real application, these would make actual API calls to the Rails backend

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  // Simulate API call
  console.log('Login attempt:', { email, password });
  
  // Simulate MFA for some users
  if (email === 'mfa@example.com') {
    return {
      mfaRequired: true,
      mfaToken: 'mock-mfa-token'
    };
  }
  
  // Simulate successful login
  return {
    token: 'mock-jwt-token',
    user: {
      id: '1',
      email,
      firstName: 'John',
      lastName: 'Doe',
      role: email.includes('admin') ? 'admin' : email.includes('landlord') ? 'landlord' : 'tenant',
      profileCompleted: true
    }
  };
};

export const verifyMfa = async (mfaToken: string, code: string): Promise<LoginResponse> => {
  // Simulate API call
  console.log('MFA verification:', { mfaToken, code });
  
  // Simulate successful MFA verification
  return {
    token: 'mock-jwt-token-after-mfa',
    user: {
      id: '1',
      email: 'mfa@example.com',
      firstName: 'MFA',
      lastName: 'User',
      role: 'tenant',
      profileCompleted: true
    }
  };
};

export const registerUser = async (userData: RegisterUserData): Promise<LoginResponse> => {
  // Simulate API call
  console.log('Register attempt:', userData);
  
  // Simulate successful registration
  return {
    token: 'mock-jwt-token',
    user: {
      id: '2',
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      contactNumber: userData.contactNumber,
      dateOfBirth: userData.dateOfBirth,
      idNumber: userData.idNumber,
      companyName: userData.companyName,
      profileCompleted: true
    }
  };
};

export const logoutUser = async (): Promise<void> => {
  // Simulate API call
  console.log('Logout');
  return Promise.resolve();
};

export const refreshToken = async (token: string): Promise<{ token: string; user: User }> => {
  // Simulate API call
  console.log('Token refresh:', token);
  
  // Simulate successful token refresh
  return {
    token: 'refreshed-mock-jwt-token',
    user: {
      id: '1',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'tenant',
      profileCompleted: true
    }
  };
};

export const updateProfile = async (userId: string, profileData: Partial<User>): Promise<User> => {
  // Simulate API call
  console.log('Profile update:', { userId, profileData });
  
  // Simulate successful profile update
  return {
    id: userId,
    email: 'user@example.com',
    firstName: profileData.firstName || 'John',
    lastName: profileData.lastName || 'Doe',
    role: profileData.role || 'tenant',
    contactNumber: profileData.contactNumber,
    dateOfBirth: profileData.dateOfBirth,
    idNumber: profileData.idNumber,
    companyName: profileData.companyName,
    profileCompleted: true
  };
};