/*
  # Add unique constraint to user_logos table

  1. Changes
    - Add unique constraint on user_id column in user_logos table
    - This allows upsert operations to work properly
    - Ensures each user can have only one logo entry

  2. Security
    - No changes to existing RLS policies
*/

ALTER TABLE user_logos ADD CONSTRAINT user_logos_user_id_key UNIQUE (user_id);