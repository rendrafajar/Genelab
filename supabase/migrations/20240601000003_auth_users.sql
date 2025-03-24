-- Create auth users for testing
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@sekolah.sch.id', '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', NOW(), NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'guru@sekolah.sch.id', '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', NOW(), NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000003', 'viewer@sekolah.sch.id', '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create corresponding users in public.users table
INSERT INTO public.users (id, name, email, role, status, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Admin Sekolah', 'admin@sekolah.sch.id', 'admin', 'active', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'Guru Matematika', 'guru@sekolah.sch.id', 'user', 'active', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000003', 'Pengamat Jadwal', 'viewer@sekolah.sch.id', 'viewer', 'active', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
