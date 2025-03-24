-- Create tables for the scheduling system

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  max_hours INTEGER NOT NULL DEFAULT 24,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  grade INTEGER NOT NULL,
  student_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  hours_per_week INTEGER NOT NULL,
  requires_lab BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time slots table
CREATE TABLE IF NOT EXISTS time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(day, start_time, end_time)
);

-- Room constraints table
CREATE TABLE IF NOT EXISTS room_constraints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  department TEXT,
  available_day TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teacher constraints table
CREATE TABLE IF NOT EXISTS teacher_constraints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  semester TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedule items table
CREATE TABLE IF NOT EXISTS schedule_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id),
  teacher_id UUID NOT NULL REFERENCES teachers(id),
  class_id UUID NOT NULL REFERENCES classes(id),
  room_id UUID NOT NULL REFERENCES rooms(id),
  time_slot_id UUID NOT NULL REFERENCES time_slots(id),
  day TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer',
  last_login TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_constraints ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_constraints ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public access" ON teachers;
CREATE POLICY "Public access"
ON teachers FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access" ON classes;
CREATE POLICY "Public access"
ON classes FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access" ON rooms;
CREATE POLICY "Public access"
ON rooms FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access" ON subjects;
CREATE POLICY "Public access"
ON subjects FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access" ON time_slots;
CREATE POLICY "Public access"
ON time_slots FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access" ON room_constraints;
CREATE POLICY "Public access"
ON room_constraints FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access" ON teacher_constraints;
CREATE POLICY "Public access"
ON teacher_constraints FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access" ON schedules;
CREATE POLICY "Public access"
ON schedules FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access" ON schedule_items;
CREATE POLICY "Public access"
ON schedule_items FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public access" ON users;
CREATE POLICY "Public access"
ON users FOR SELECT
USING (true);

-- Enable realtime
alter publication supabase_realtime add table teachers;
alter publication supabase_realtime add table classes;
alter publication supabase_realtime add table rooms;
alter publication supabase_realtime add table subjects;
alter publication supabase_realtime add table time_slots;
alter publication supabase_realtime add table room_constraints;
alter publication supabase_realtime add table teacher_constraints;
alter publication supabase_realtime add table schedules;
alter publication supabase_realtime add table schedule_items;
alter publication supabase_realtime add table users;
