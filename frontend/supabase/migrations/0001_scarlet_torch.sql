/*
  # Initial Schema Setup for Student Management System

  1. New Tables
    - `cohorts`
      - `id` (uuid, primary key)
      - `name` (text) - e.g., "AY 2024-25"
      - `created_at` (timestamp)
    
    - `courses`
      - `id` (uuid, primary key)
      - `name` (text) - e.g., "CBSE 9 Science"
      - `created_at` (timestamp)
    
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `cohort_id` (uuid, foreign key)
      - `date_joined` (timestamp)
      - `last_login` (timestamp)
      - `status` (boolean)
      - `created_at` (timestamp)
    
    - `student_courses`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `course_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create cohorts table
CREATE TABLE cohorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create students table
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cohort_id uuid REFERENCES cohorts(id),
  date_joined timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now(),
  status boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create student_courses junction table
CREATE TABLE student_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id)
);

-- Enable RLS
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_courses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON cohorts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users" ON courses
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users" ON students
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users" ON student_courses
  FOR SELECT TO authenticated USING (true);

-- Insert initial data
INSERT INTO cohorts (name) VALUES ('AY 2024-25');

INSERT INTO courses (name) VALUES 
  ('CBSE 9 Science'),
  ('CBSE 9 Math');