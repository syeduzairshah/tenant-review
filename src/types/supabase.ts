export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          role: 'tenant' | 'landlord' | 'admin'
          contact_number: string | null
          date_of_birth: string | null
          id_number: string | null
          company_name: string | null
          company_type: 'individual' | 'business' | null
          profile_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          role: 'tenant' | 'landlord' | 'admin'
          contact_number?: string | null
          date_of_birth?: string | null
          id_number?: string | null
          company_name?: string | null
          company_type?: 'individual' | 'business' | null
          profile_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          role?: 'tenant' | 'landlord' | 'admin'
          contact_number?: string | null
          date_of_birth?: string | null
          id_number?: string | null
          company_name?: string | null
          company_type?: 'individual' | 'business' | null
          profile_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          landlord_id: string | null
          tenant_id: string | null
          unit_number: string
          street: string
          city: string
          state: string
          country: string
          postal_code: string
          status: 'pending_review' | 'approved' | 'rejected'
          uploaded_by: string | null
          uploaded_at: string
          reviewed_by: string | null
          reviewed_at: string | null
          rejection_reason: string | null
          document_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          landlord_id?: string | null
          tenant_id?: string | null
          unit_number: string
          street: string
          city: string
          state: string
          country: string
          postal_code: string
          status: 'pending_review' | 'approved' | 'rejected'
          uploaded_by?: string | null
          uploaded_at?: string
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          document_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          landlord_id?: string | null
          tenant_id?: string | null
          unit_number?: string
          street?: string
          city?: string
          state?: string
          country?: string
          postal_code?: string
          status?: 'pending_review' | 'approved' | 'rejected'
          uploaded_by?: string | null
          uploaded_at?: string
          reviewed_by?: string | null
          reviewed_at?: string | null
          rejection_reason?: string | null
          document_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          contract_id: string | null
          reviewer_id: string | null
          reviewed_id: string | null
          rating: number | null
          comment: string
          status: 'pending' | 'approved' | 'rejected'
          reviewer_role: 'tenant' | 'landlord'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          contract_id?: string | null
          reviewer_id?: string | null
          reviewed_id?: string | null
          rating?: number | null
          comment: string
          status: 'pending' | 'approved' | 'rejected'
          reviewer_role: 'tenant' | 'landlord'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          contract_id?: string | null
          reviewer_id?: string | null
          reviewed_id?: string | null
          rating?: number | null
          comment?: string
          status?: 'pending' | 'approved' | 'rejected'
          reviewer_role?: 'tenant' | 'landlord'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}