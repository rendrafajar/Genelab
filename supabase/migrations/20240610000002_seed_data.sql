-- Insert default admin user
INSERT INTO users (id, name, email, role, status)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Admin Utama', 'admin@smk.edu', 'admin', 'active'),
  ('00000000-0000-0000-0000-000000000002', 'Budi Santoso', 'budi@smk.edu', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000003', 'Dewi Lestari', 'dewi@smk.edu', 'user', 'active'),
  ('00000000-0000-0000-0000-000000000004', 'Eko Prasetyo', 'eko@smk.edu', 'viewer', 'inactive'),
  ('00000000-0000-0000-0000-000000000005', 'Fitri Handayani', 'fitri@smk.edu', 'viewer', 'active')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

-- Insert sample teachers
INSERT INTO teachers (id, name, email, department, max_hours)
VALUES
  ('00000000-0000-0000-0000-000000000101', 'Budi Santoso, S.Pd', 'budi.santoso@smk.sch.id', 'Matematika', 24),
  ('00000000-0000-0000-0000-000000000102', 'Siti Rahayu, M.Pd', 'siti.rahayu@smk.sch.id', 'Bahasa Inggris', 24),
  ('00000000-0000-0000-0000-000000000103', 'Ahmad Fauzi, S.T', 'ahmad.fauzi@smk.sch.id', 'Teknik Komputer dan Jaringan', 24)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  department = EXCLUDED.department,
  max_hours = EXCLUDED.max_hours;

-- Insert sample classes
INSERT INTO classes (id, name, department, grade, student_count)
VALUES
  ('00000000-0000-0000-0000-000000000201', 'X RPL A', 'Rekayasa Perangkat Lunak', 10, 36),
  ('00000000-0000-0000-0000-000000000202', 'XI TKJ B', 'Teknik Komputer dan Jaringan', 11, 32),
  ('00000000-0000-0000-0000-000000000203', 'XII MM C', 'Multimedia', 12, 30)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  department = EXCLUDED.department,
  grade = EXCLUDED.grade,
  student_count = EXCLUDED.student_count;

-- Insert sample rooms
INSERT INTO rooms (id, name, type, capacity, is_active)
VALUES
  ('00000000-0000-0000-0000-000000000301', 'Laboratorium Komputer 1', 'praktikum', 30, true),
  ('00000000-0000-0000-0000-000000000302', 'Ruang Teori 101', 'teori', 40, true),
  ('00000000-0000-0000-0000-000000000303', 'Laboratorium Jaringan', 'praktikum', 25, true),
  ('00000000-0000-0000-0000-000000000304', 'Ruang Teori 102', 'teori', 35, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  capacity = EXCLUDED.capacity,
  is_active = EXCLUDED.is_active;

-- Insert sample subjects
INSERT INTO subjects (id, name, code, department, hours_per_week, requires_lab)
VALUES
  ('00000000-0000-0000-0000-000000000401', 'Matematika', 'MTK10', 'Semua Jurusan', 4, false),
  ('00000000-0000-0000-0000-000000000402', 'Bahasa Inggris', 'BIG11', 'Semua Jurusan', 3, false),
  ('00000000-0000-0000-0000-000000000403', 'Pemrograman Web', 'RPL12', 'RPL', 6, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  code = EXCLUDED.code,
  department = EXCLUDED.department,
  hours_per_week = EXCLUDED.hours_per_week,
  requires_lab = EXCLUDED.requires_lab;

-- Insert sample time slots
INSERT INTO time_slots (id, day, start_time, end_time)
VALUES
  ('00000000-0000-0000-0000-000000000501', 'Senin', '07:00', '07:45'),
  ('00000000-0000-0000-0000-000000000502', 'Senin', '07:45', '08:30'),
  ('00000000-0000-0000-0000-000000000503', 'Senin', '08:30', '09:15'),
  ('00000000-0000-0000-0000-000000000504', 'Selasa', '07:00', '07:45'),
  ('00000000-0000-0000-0000-000000000505', 'Selasa', '07:45', '08:30'),
  ('00000000-0000-0000-0000-000000000506', 'Selasa', '08:30', '09:15')
ON CONFLICT (id) DO UPDATE SET
  day = EXCLUDED.day,
  start_time = EXCLUDED.start_time,
  end_time = EXCLUDED.end_time;

-- Insert sample schedule
INSERT INTO schedules (id, name, semester, academic_year, status)
VALUES
  ('00000000-0000-0000-0000-000000000601', 'Jadwal Semester Ganjil', 'Ganjil', '2023/2024', 'active')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  semester = EXCLUDED.semester,
  academic_year = EXCLUDED.academic_year,
  status = EXCLUDED.status;

-- Insert sample schedule items
INSERT INTO schedule_items (id, schedule_id, subject_id, teacher_id, class_id, room_id, time_slot_id, day)
VALUES
  ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000501', 'Senin'),
  ('00000000-0000-0000-0000-000000000702', '00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000502', 'Senin'),
  ('00000000-0000-0000-0000-000000000703', '00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000403', '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000504', 'Selasa')
ON CONFLICT (id) DO UPDATE SET
  schedule_id = EXCLUDED.schedule_id,
  subject_id = EXCLUDED.subject_id,
  teacher_id = EXCLUDED.teacher_id,
  class_id = EXCLUDED.class_id,
  room_id = EXCLUDED.room_id,
  time_slot_id = EXCLUDED.time_slot_id,
  day = EXCLUDED.day;