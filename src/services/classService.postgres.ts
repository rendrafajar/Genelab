import { query } from "@/lib/postgres";

export interface Class {
  id: string;
  name: string;
  department: string;
  grade: number;
  student_count: number;
  created_at?: string;
  updated_at?: string;
}

export const classService = {
  async getClasses(): Promise<Class[]> {
    try {
      const result = await query("SELECT * FROM classes ORDER BY name");
      return result.rows;
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  },

  async getClassById(id: string): Promise<Class | null> {
    try {
      const result = await query("SELECT * FROM classes WHERE id = $1", [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching class with id ${id}:`, error);
      throw error;
    }
  },

  async createClass(classData: Omit<Class, "id">): Promise<Class> {
    try {
      const result = await query(
        `INSERT INTO classes (name, department, grade, student_count, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, NOW(), NOW()) 
         RETURNING *`,
        [
          classData.name,
          classData.department,
          classData.grade,
          classData.student_count,
        ],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  },

  async updateClass(id: string, classData: Partial<Class>): Promise<Class> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (classData.name !== undefined) {
        fields.push(`name = $${paramCount}`);
        values.push(classData.name);
        paramCount++;
      }

      if (classData.department !== undefined) {
        fields.push(`department = $${paramCount}`);
        values.push(classData.department);
        paramCount++;
      }

      if (classData.grade !== undefined) {
        fields.push(`grade = $${paramCount}`);
        values.push(classData.grade);
        paramCount++;
      }

      if (classData.student_count !== undefined) {
        fields.push(`student_count = $${paramCount}`);
        values.push(classData.student_count);
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);

      if (fields.length === 0) {
        return this.getClassById(id) as Promise<Class>;
      }

      values.push(id);
      const result = await query(
        `UPDATE classes SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
        values,
      );

      return result.rows[0];
    } catch (error) {
      console.error(`Error updating class with id ${id}:`, error);
      throw error;
    }
  },

  async deleteClass(id: string): Promise<void> {
    try {
      await query("DELETE FROM classes WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting class with id ${id}:`, error);
      throw error;
    }
  },

  async getClassesByDepartment(department: string): Promise<Class[]> {
    try {
      const result = await query(
        "SELECT * FROM classes WHERE department = $1 ORDER BY name",
        [department],
      );
      return result.rows;
    } catch (error) {
      console.error(
        `Error fetching classes from department ${department}:`,
        error,
      );
      throw error;
    }
  },

  async getClassesByGrade(grade: number): Promise<Class[]> {
    try {
      const result = await query(
        "SELECT * FROM classes WHERE grade = $1 ORDER BY name",
        [grade],
      );
      return result.rows;
    } catch (error) {
      console.error(`Error fetching classes from grade ${grade}:`, error);
      throw error;
    }
  },
};
