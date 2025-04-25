import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string, userData: Database['public']['Tables']['users']['Insert']) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });

  if (authError) throw authError;

  // Create user profile
  const { error: profileError } = await supabase
    .from('users')
    .insert([userData]);

  if (profileError) throw profileError;

  return authData;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// User helpers
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) return null;

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) throw profileError;
  return profile;
};

export const updateUserProfile = async (userId: string, updates: Database['public']['Tables']['users']['Update']) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Contract helpers
export const createContract = async (contractData: Database['public']['Tables']['contracts']['Insert']) => {
  const { data, error } = await supabase
    .from('contracts')
    .insert([contractData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getContract = async (contractId: string) => {
  const { data, error } = await supabase
    .from('contracts')
    .select(`
      *,
      landlord:landlord_id(id, first_name, last_name, email, company_name),
      tenant:tenant_id(id, first_name, last_name, email),
      uploader:uploaded_by(id, first_name, last_name),
      reviewer:reviewed_by(id, first_name, last_name)
    `)
    .eq('id', contractId)
    .single();

  if (error) throw error;
  return data;
};

export const getUserContracts = async (userId: string) => {
  const { data, error } = await supabase
    .from('contracts')
    .select(`
      *,
      landlord:landlord_id(id, first_name, last_name, email, company_name),
      tenant:tenant_id(id, first_name, last_name, email)
    `)
    .or(`landlord_id.eq.${userId},tenant_id.eq.${userId},uploaded_by.eq.${userId}`);

  if (error) throw error;
  return data;
};

export const updateContractStatus = async (
  contractId: string,
  status: 'approved' | 'rejected',
  reviewerId: string,
  rejectionReason?: string
) => {
  const { data, error } = await supabase
    .from('contracts')
    .update({
      status,
      reviewed_by: reviewerId,
      reviewed_at: new Date().toISOString(),
      rejection_reason: rejectionReason
    })
    .eq('id', contractId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Review helpers
export const createReview = async (reviewData: Database['public']['Tables']['reviews']['Insert']) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserReviews = async (userId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      contract:contract_id(*),
      reviewer:reviewer_id(id, first_name, last_name),
      reviewed:reviewed_id(id, first_name, last_name)
    `)
    .or(`reviewer_id.eq.${userId},reviewed_id.eq.${userId}`);

  if (error) throw error;
  return data;
};

export const updateReviewStatus = async (
  reviewId: string,
  status: 'approved' | 'rejected'
) => {
  const { data, error } = await supabase
    .from('reviews')
    .update({ status })
    .eq('id', reviewId)
    .select()
    .single();

  if (error) throw error;
  return data;
};