import pool from "@/lib/database";

export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  max_hours: number;
  created_at?: string;
  updated_at?: string;
}

export const teacherService = {
  async getTeachers(): Promise<Teacher[]> {
    try {
      const result = await pool.query("SELECT * FROM teachers ORDER BY name");
      return result.rows;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }
  },

  async getTeacherById(id: string): Promise<Teacher | null> {
    try {
      const result = await pool.query("SELECT * FROM teachers WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching teacher with id ${id}:`, error);
      throw error;
    }
  },

  async createTeacher(teacher: Omit<Teacher, "id">): Promise<Teacher> {
    try {
      const { name, email, department, max_hours } = teacher;
      const result = await pool.query(
        "INSERT INTO teachers (name, email, department, max_hours) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, department, max_hours],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating teacher:", error);
      throw error;
    }
  },

  async updateTeacher(id: string, teacher: Partial<Teacher>): Promise<Teacher> {
    try {
      const { name, email, department, max_hours } = teacher;
      const result = await pool.query(
        "UPDATE teachers SET name = COALESCE($1, name), email = COALESCE($2, email), department = COALESCE($3, department), max_hours = COALESCE($4, max_hours), updated_at = NOW() WHERE id = $5 RETURNING *",
        [name, email, department, max_hours, id],
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating teacher with id ${id}:`, error);
      throw error;
    }
  },

  async deleteTeacher(id: string): Promise<void> {
    try {
      await pool.query("DELETE FROM teachers WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting teacher with id ${id}:`, error);
      throw error;
    }
  },

  async getTeachersByDepartment(department: string): Promise<Teacher[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM teachers WHERE department = $1 ORDER BY name",
        [department],
      );
      return result.rows;
    } catch (error) {
      console.error(
        `Error fetching teachers from department ${department}:`,
        error,
      );
      throw error;
    }
  },
};
