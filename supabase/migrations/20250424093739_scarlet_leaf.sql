/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `role` (text)
      - `contact_number` (text)
      - `date_of_birth` (date)
      - `id_number` (text)
      - `company_name` (text, nullable)
      - `company_type` (text, nullable)
      - `profile_completed` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `contracts`
      - `id` (uuid, primary key)
      - `landlord_id` (uuid, references users)
      - `tenant_id` (uuid, references users)
      - `unit_number` (text)
      - `street` (text)
      - `city` (text)
      - `state` (text)
      - `country` (text)
      - `postal_code` (text)
      - `status` (text)
      - `uploaded_by` (uuid, references users)
      - `uploaded_at` (timestamp)
      - `reviewed_by` (uuid, references users)
      - `reviewed_at` (timestamp)
      - `rejection_reason` (text)
      - `document_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `reviews`
      - `id` (uuid, primary key)
      - `contract_id` (uuid, references contracts)
      - `reviewer_id` (uuid, references users)
      - `reviewed_id` (uuid, references users)
      - `rating` (integer)
      - `comment` (text)
      - `status` (text)
      - `reviewer_role` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('tenant', 'landlord', 'admin')),
  contact_number text,
  date_of_birth date,
  id_number text,
  company_name text,
  company_type text CHECK (company_type IN ('individual', 'business')),
  profile_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contracts table if it doesn't exist
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id uuid REFERENCES users(id),
  tenant_id uuid REFERENCES users(id),
  unit_number text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  country text NOT NULL,
  postal_code text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending_review', 'approved', 'rejected')),
  uploaded_by uuid REFERENCES users(id),
  uploaded_at timestamptz DEFAULT now(),
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  rejection_reason text,
  document_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table if it doesn't exist
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id uuid REFERENCES contracts(id),
  reviewer_id uuid REFERENCES users(id),
  reviewed_id uuid REFERENCES users(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewer_role text NOT NULL CHECK (reviewer_role IN ('tenant', 'landlord')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (safe to run multiple times)
DO $$ 
BEGIN
  EXECUTE 'ALTER TABLE users ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE contracts ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE reviews ENABLE ROW LEVEL SECURITY';
EXCEPTION 
  WHEN others THEN NULL;
END $$;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  -- Users policies
  DROP POLICY IF EXISTS "Users can read their own data" ON users;
  DROP POLICY IF EXISTS "Users can update their own data" ON users;
  
  -- Contracts policies
  DROP POLICY IF EXISTS "Users can read contracts they're involved in" ON contracts;
  DROP POLICY IF EXISTS "Users can create contracts" ON contracts;
  
  -- Reviews policies
  DROP POLICY IF EXISTS "Users can read approved reviews" ON reviews;
  DROP POLICY IF EXISTS "Users can create reviews for their contracts" ON reviews;
END $$;

-- Recreate policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read contracts they're involved in"
  ON contracts
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = landlord_id OR 
    auth.uid() = tenant_id OR 
    auth.uid() = uploaded_by OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Users can create contracts"
  ON contracts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can read approved reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (
    status = 'approved' OR
    auth.uid() = reviewer_id OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

CREATE POLICY "Users can create reviews for their contracts"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM contracts
      WHERE id = contract_id
      AND (
        (auth.uid() = landlord_id AND reviewer_role = 'landlord') OR
        (auth.uid() = tenant_id AND reviewer_role = 'tenant')
      )
    )
  );

-- Create or replace the updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_contracts_updated_at ON contracts;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_contracts_updated_at
  BEFORE UPDATE ON contracts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();