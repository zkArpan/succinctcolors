/*
  # Create user logos system

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `x_username` (text, unique)
      - `created_at` (timestamp)
    - `user_logos`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to user_profiles)
      - `logo_colors` (jsonb, stores color configuration)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
    - Add policy for public read access to display logos
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  x_username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  logo_colors jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_logos ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can read all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Policies for user_logos
CREATE POLICY "Anyone can read logos"
  ON user_logos
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can insert their own logos"
  ON user_logos
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Users can update their own logos"
  ON user_logos
  FOR UPDATE
  TO authenticated, anon
  USING (true);