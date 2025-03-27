-- Database schema for genelabv2
-- PostgreSQL database

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user', 'viewer')),
  last_login TIMESTAMP,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  max_hours INTEGER NOT NULL DEFAULT 24,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  grade INTEGER NOT NULL,
  student_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Room constraints table
CREATE TABLE IF NOT EXISTS room_constraints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  department TEXT,
  available_day TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  hours_per_week INTEGER NOT NULL,
  requires_lab BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time slots table
CREATE TABLE IF NOT EXISTS time_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(day, start_time, end_time)
);

-- Teacher constraints table
CREATE TABLE IF NOT EXISTS teacher_constraints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  semester TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'draft', 'archived')) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedule items table
CREATE TABLE IF NOT EXISTS schedule_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Insert default admin user
INSERT INTO users (id, name, email, role, status)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Admin Utama', 'admin@smk.edu', 'admin', 'active'),
  ('00000000-0000-0000-0000-000000000002', 'Budi Santoso', 'budi@smk.edu', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000003', 'Dewi Lestari', 'dewi@smk.edu', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000004', 'Eko Prasetyo', 'eko@smk.edu', 'viewer', 'inactive'),
  ('00000000-0000-0000-0000-000000000005', 'Fitri Handayani', 'fitri@smk.edu', 'viewer', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert sample teachers
INSERT INTO teachers (id, name, email, department, max_hours)
VALUES
  ('00000000-0000-0000-0000-000000000101', 'Budi Santoso, S.Pd', 'budi.santoso@smk.sch.id', 'Matematika', 24),
  ('00000000-0000-0000-0000-000000000102', 'Siti Rahayu, M.Pd', 'siti.rahayu@smk.sch.id', 'Bahasa Inggris', 24),
  ('00000000-0000-0000-0000-000000000103', 'Ahmad Fauzi, S.T', 'ahmad.fauzi@smk.sch.id', 'Teknik Komputer dan Jaringan', 24)
ON CONFLICT (id) DO NOTHING;

-- Insert sample classes
INSERT INTO classes (id, name, department, grade, student_count)
VALUES
  ('00000000-0000-0000-0000-000000000201', 'X RPL A', 'Rekayasa Perangkat Lunak', 10, 36),
  ('00000000-0000-0000-0000-000000000202', 'XI TKJ B', 'Teknik Komputer dan Jaringan', 11, 32),
  ('00000000-0000-0000-0000-000000000203', 'XII MM C', 'Multimedia', 12, 30)
ON CONFLICT (id) DO NOTHING;

-- Insert sample rooms
INSERT INTO rooms (id, name, type, capacity, is_active)
VALUES
  ('00000000-0000-0000-0000-000000000301', 'Laboratorium Komputer 1', 'praktikum', 30, true),
  ('00000000-0000-0000-0000-000000000302', 'Ruang Teori 101', 'teori', 40, true),
  ('00000000-0000-0000-0000-000000000303', 'Laboratorium Jaringan', 'praktikum', 25, true),
  ('00000000-0000-0000-0000-000000000304', 'Ruang Teori 102', 'teori', 35, false)
ON CONFLICT (id) DO NOTHING;

-- Insert sample subjects
INSERT INTO subjects (id, name, code, department, hours_per_week, requires_lab)
VALUES
  ('00000000-0000-0000-0000-000000000401', 'Matematika', 'MTK10', 'Semua Jurusan', 4, false),
  ('00000000-0000-0000-0000-000000000402', 'Bahasa Inggris', 'BIG11', 'Semua Jurusan', 3, false),
  ('00000000-0000-0000-0000-000000000403', 'Pemrograman Web', 'RPL12', 'RPL', 6, true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample time slots
INSERT INTO time_slots (id, day, start_time, end_time)
VALUES
  ('00000000-0000-0000-0000-000000000501', 'Senin', '07:00', '07:45'),
  ('00000000-0000-0000-0000-000000000502', 'Senin', '07:45', '08:30'),
  ('00000000-0000-0000-0000-000000000503', 'Senin', '08:30', '09:15'),
  ('00000000-0000-0000-0000-000000000504', 'Selasa', '07:00', '07:45'),
  ('00000000-0000-0000-0000-000000000505', 'Selasa', '07:45', '08:30'),
  ('00000000-0000-0000-0000-000000000506', 'Selasa', '08:30', '09:15')
ON CONFLICT (id) DO NOTHING;

-- Insert sample schedule
INSERT INTO schedules (id, name, semester, academic_year, status)
VALUES
  ('00000000-0000-0000-0000-000000000601', 'Jadwal Semester Ganjil', 'Ganjil', '2023/2024', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert sample schedule items
INSERT INTO schedule_items (id, schedule_id, subject_id, teacher_id, class_id, room_id, time_slot_id, day)
VALUES
  ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000501', 'Senin'),
  ('00000000-0000-0000-0000-000000000702', '00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000502', 'Senin'),
  ('00000000-0000-0000-0000-000000000703', '00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000403', '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000504', 'Selasa')
ON CONFLICT (id) DO NOTHING;