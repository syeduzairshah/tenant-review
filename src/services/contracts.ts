import { Contract, ContractFormData, ContractStatus } from '../types/contract';

// Simulated API endpoints for contract services
// In a real application, these would make actual API calls to the Rails backend

export const getContracts = async (userId: string): Promise<Contract[]> => {
  // Simulate API call
  console.log('Fetching contracts for user:', userId);
  
  // Mock data
  return [
    {
      id: '1',
      landlord: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        companyType: 'individual'
      },
      tenant: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      },
      propertyAddress: {
        unitNumber: '101',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10001'
      },
      status: 'pending_review',
      uploadedBy: userId,
      uploadedAt: new Date().toISOString(),
      tenantHasReviewed: false,
      landlordHasReviewed: false
    },
    {
      id: '2',
      landlord: {
        firstName: 'Property',
        lastName: 'Management',
        email: 'pm@example.com',
        companyName: 'ABC Properties',
        companyType: 'business'
      },
      tenant: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah@example.com'
      },
      propertyAddress: {
        unitNumber: '202',
        street: '456 Oak Ave',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        postalCode: '60601'
      },
      status: 'approved',
      uploadedBy: '3',
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedBy: 'admin1',
      reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      tenantHasReviewed: true,
      landlordHasReviewed: false
    }
  ];
};

export const getContract = async (contractId: string): Promise<Contract> => {
  // Simulate API call
  console.log('Fetching contract:', contractId);
  
  // Mock data
  return {
    id: contractId,
    landlord: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      companyType: 'individual'
    },
    tenant: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    },
    propertyAddress: {
      unitNumber: '101',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001'
    },
    status: 'pending_review',
    uploadedBy: '1',
    uploadedAt: new Date().toISOString(),
    tenantHasReviewed: false,
    landlordHasReviewed: false
  };
};

export const uploadContract = async (contractData: ContractFormData): Promise<Contract> => {
  // Simulate API call
  console.log('Uploading contract:', contractData);
  
  // Mock response
  return {
    id: Date.now().toString(),
    landlord: contractData.landlord,
    tenant: contractData.tenant,
    propertyAddress: contractData.propertyAddress,
    status: 'pending_review',
    uploadedBy: '1', // Mock user ID
    uploadedAt: new Date().toISOString(),
    tenantHasReviewed: false,
    landlordHasReviewed: false,
    documentUrl: contractData.documentFile ? URL.createObjectURL(contractData.documentFile) : undefined
  };
};

export const updateContractStatus = async (
  contractId: string, 
  status: ContractStatus, 
  rejectionReason?: string
): Promise<Contract> => {
  // Simulate API call
  console.log('Updating contract status:', { contractId, status, rejectionReason });
  
  // Mock updated contract
  return {
    id: contractId,
    landlord: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      companyType: 'individual'
    },
    tenant: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    },
    propertyAddress: {
      unitNumber: '101',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001'
    },
    status,
    uploadedBy: '1',
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reviewedBy: 'admin1',
    reviewedAt: new Date().toISOString(),
    rejectionReason,
    tenantHasReviewed: false,
    landlordHasReviewed: false
  };
};

export const getAdminContracts = async (): Promise<Contract[]> => {
  // Simulate API call for admin
  console.log('Fetching contracts for admin');
  
  // Mock data
  return [
    {
      id: '1',
      landlord: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        companyType: 'individual'
      },
      tenant: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      },
      propertyAddress: {
        unitNumber: '101',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10001'
      },
      status: 'pending_review',
      uploadedBy: '1',
      uploadedAt: new Date().toISOString(),
      tenantHasReviewed: false,
      landlordHasReviewed: false
    },
    {
      id: '2',
      landlord: {
        firstName: 'Property',
        lastName: 'Management',
        email: 'pm@example.com',
        companyName: 'ABC Properties',
        companyType: 'business'
      },
      tenant: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah@example.com'
      },
      propertyAddress: {
        unitNumber: '202',
        street: '456 Oak Ave',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        postalCode: '60601'
      },
      status: 'approved',
      uploadedBy: '3',
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedBy: 'admin1',
      reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      tenantHasReviewed: true,
      landlordHasReviewed: false
    }
  ];
};