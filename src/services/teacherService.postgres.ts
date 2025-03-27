import { query } from "@/lib/postgres";

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
      const result = await query("SELECT * FROM teachers ORDER BY name");
      return result.rows;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }
  },

  async getTeacherById(id: string): Promise<Teacher | null> {
    try {
      const result = await query("SELECT * FROM teachers WHERE id = $1", [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching teacher with id ${id}:`, error);
      throw error;
    }
  },

  async createTeacher(teacher: Omit<Teacher, "id">): Promise<Teacher> {
    try {
      const result = await query(
        `INSERT INTO teachers (name, email, department, max_hours, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, NOW(), NOW()) 
         RETURNING *`,
        [
          teacher.name,
          teacher.email,
          teacher.department,
          teacher.max_hours || 40,
        ],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating teacher:", error);
      throw error;
    }
  },

  async updateTeacher(id: string, teacher: Partial<Teacher>): Promise<Teacher> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (teacher.name !== undefined) {
        fields.push(`name = $${paramCount}`);
        values.push(teacher.name);
        paramCount++;
      }

      if (teacher.email !== undefined) {
        fields.push(`email = $${paramCount}`);
        values.push(teacher.email);
        paramCount++;
      }

      if (teacher.department !== undefined) {
        fields.push(`department = $${paramCount}`);
        values.push(teacher.department);
        paramCount++;
      }

      if (teacher.max_hours !== undefined) {
        fields.push(`max_hours = $${paramCount}`);
        values.push(teacher.max_hours);
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);

      if (fields.length === 0) {
        return this.getTeacherById(id) as Promise<Teacher>;
      }

      values.push(id);
      const result = await query(
        `UPDATE teachers SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
        values,
      );

      return result.rows[0];
    } catch (error) {
      console.error(`Error updating teacher with id ${id}:`, error);
      throw error;
    }
  },

  async deleteTeacher(id: string): Promise<void> {
    try {
      await query("DELETE FROM teachers WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting teacher with id ${id}:`, error);
      throw error;
    }
  },

  async getTeachersByDepartment(department: string): Promise<Teacher[]> {
    try {
      const result = await query(
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
