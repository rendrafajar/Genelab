import { query } from "@/lib/postgres";

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
      const result = await query("SELECT * FROM subjects ORDER BY name");
      return result.rows;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw error;
    }
  },

  async getSubjectById(id: string): Promise<Subject | null> {
    try {
      const result = await query("SELECT * FROM subjects WHERE id = $1", [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching subject with id ${id}:`, error);
      throw error;
    }
  },

  async createSubject(subject: Omit<Subject, "id">): Promise<Subject> {
    try {
      const result = await query(
        `INSERT INTO subjects (name, code, department, hours_per_week, requires_lab, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
         RETURNING *`,
        [
          subject.name,
          subject.code,
          subject.department,
          subject.hours_per_week,
          subject.requires_lab || false,
        ],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating subject:", error);
      throw error;
    }
  },

  async updateSubject(id: string, subject: Partial<Subject>): Promise<Subject> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (subject.name !== undefined) {
        fields.push(`name = $${paramCount}`);
        values.push(subject.name);
        paramCount++;
      }

      if (subject.code !== undefined) {
        fields.push(`code = $${paramCount}`);
        values.push(subject.code);
        paramCount++;
      }

      if (subject.department !== undefined) {
        fields.push(`department = $${paramCount}`);
        values.push(subject.department);
        paramCount++;
      }

      if (subject.hours_per_week !== undefined) {
        fields.push(`hours_per_week = $${paramCount}`);
        values.push(subject.hours_per_week);
        paramCount++;
      }

      if (subject.requires_lab !== undefined) {
        fields.push(`requires_lab = $${paramCount}`);
        values.push(subject.requires_lab);
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);

      if (fields.length === 0) {
        return this.getSubjectById(id) as Promise<Subject>;
      }

      values.push(id);
      const result = await query(
        `UPDATE subjects SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
        values,
      );

      return result.rows[0];
    } catch (error) {
      console.error(`Error updating subject with id ${id}:`, error);
      throw error;
    }
  },

  async deleteSubject(id: string): Promise<void> {
    try {
      await query("DELETE FROM subjects WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting subject with id ${id}:`, error);
      throw error;
    }
  },

  async getSubjectsByDepartment(department: string): Promise<Subject[]> {
    try {
      const result = await query(
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
      const result = await query(
        "SELECT * FROM subjects WHERE requires_lab = true ORDER BY name",
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching lab subjects:", error);
      throw error;
    }
  },
};
