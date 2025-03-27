import pool from "@/lib/database";

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
      const result = await pool.query("SELECT * FROM classes ORDER BY name");
      return result.rows;
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  },

  async getClassById(id: string): Promise<Class | null> {
    try {
      const result = await pool.query("SELECT * FROM classes WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching class with id ${id}:`, error);
      throw error;
    }
  },

  async createClass(classData: Omit<Class, "id">): Promise<Class> {
    try {
      const { name, department, grade, student_count } = classData;
      const result = await pool.query(
        "INSERT INTO classes (name, department, grade, student_count) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, department, grade, student_count],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  },

  async updateClass(id: string, classData: Partial<Class>): Promise<Class> {
    try {
      const { name, department, grade, student_count } = classData;
      const result = await pool.query(
        "UPDATE classes SET name = COALESCE($1, name), department = COALESCE($2, department), grade = COALESCE($3, grade), student_count = COALESCE($4, student_count), updated_at = NOW() WHERE id = $5 RETURNING *",
        [name, department, grade, student_count, id],
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating class with id ${id}:`, error);
      throw error;
    }
  },

  async deleteClass(id: string): Promise<void> {
    try {
      await pool.query("DELETE FROM classes WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting class with id ${id}:`, error);
      throw error;
    }
  },

  async getClassesByDepartment(department: string): Promise<Class[]> {
    try {
      const result = await pool.query(
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
      const result = await pool.query(
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
