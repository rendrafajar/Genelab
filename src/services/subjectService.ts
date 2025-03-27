import pool from "@/lib/database";

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
  hours_per_week: number;
  requires_lab: boolean;
  created_at?: string;
  updated_at?: string;
}

export const subjectService = {
  async getSubjects(): Promise<Subject[]> {
    try {
      const result = await pool.query("SELECT * FROM subjects ORDER BY name");
      return result.rows;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw error;
    }
  },

  async getSubjectById(id: string): Promise<Subject | null> {
    try {
      const result = await pool.query("SELECT * FROM subjects WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching subject with id ${id}:`, error);
      throw error;
    }
  },

  async createSubject(subject: Omit<Subject, "id">): Promise<Subject> {
    try {
      const { name, code, department, hours_per_week, requires_lab } = subject;
      const result = await pool.query(
        "INSERT INTO subjects (name, code, department, hours_per_week, requires_lab) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, code, department, hours_per_week, requires_lab],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating subject:", error);
      throw error;
    }
  },

  async updateSubject(id: string, subject: Partial<Subject>): Promise<Subject> {
    try {
      const { name, code, department, hours_per_week, requires_lab } = subject;
      const result = await pool.query(
        "UPDATE subjects SET name = COALESCE($1, name), code = COALESCE($2, code), department = COALESCE($3, department), hours_per_week = COALESCE($4, hours_per_week), requires_lab = COALESCE($5, requires_lab), updated_at = NOW() WHERE id = $6 RETURNING *",
        [name, code, department, hours_per_week, requires_lab, id],
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating subject with id ${id}:`, error);
      throw error;
    }
  },

  async deleteSubject(id: string): Promise<void> {
    try {
      await pool.query("DELETE FROM subjects WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting subject with id ${id}:`, error);
      throw error;
    }
  },

  async getSubjectsByDepartment(department: string): Promise<Subject[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM subjects WHERE department = $1 ORDER BY name",
        [department],
      );
      return result.rows;
    } catch (error) {
      console.error(
        `Error fetching subjects from department ${department}:`,
        error,
      );
      throw error;
    }
  },

  async getLabSubjects(): Promise<Subject[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM subjects WHERE requires_lab = true ORDER BY name",
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching lab subjects:", error);
      throw error;
    }
  },
};
