import pool from "@/lib/database";

export interface TeacherConstraint {
  id: string;
  teacher_id: string;
  day: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}

export const teacherConstraintService = {
  async getTeacherConstraints(teacherId: string): Promise<TeacherConstraint[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM teacher_constraints WHERE teacher_id = $1 ORDER BY day, start_time",
        [teacherId],
      );
      return result.rows;
    } catch (error) {
      console.error(
        `Error fetching constraints for teacher ${teacherId}:`,
        error,
      );
      throw error;
    }
  },

  async createTeacherConstraint(
    constraint: Omit<TeacherConstraint, "id">,
  ): Promise<TeacherConstraint> {
    try {
      const { teacher_id, day, start_time, end_time, is_available } =
        constraint;
      const result = await pool.query(
        "INSERT INTO teacher_constraints (teacher_id, day, start_time, end_time, is_available) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [teacher_id, day, start_time, end_time, is_available],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating teacher constraint:", error);
      throw error;
    }
  },

  async updateTeacherConstraint(
    id: string,
    constraint: Partial<TeacherConstraint>,
  ): Promise<TeacherConstraint> {
    try {
      const { teacher_id, day, start_time, end_time, is_available } =
        constraint;
      const result = await pool.query(
        "UPDATE teacher_constraints SET teacher_id = COALESCE($1, teacher_id), day = COALESCE($2, day), start_time = COALESCE($3, start_time), end_time = COALESCE($4, end_time), is_available = COALESCE($5, is_available), updated_at = NOW() WHERE id = $6 RETURNING *",
        [teacher_id, day, start_time, end_time, is_available, id],
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating teacher constraint with id ${id}:`, error);
      throw error;
    }
  },

  async deleteTeacherConstraint(id: string): Promise<void> {
    try {
      await pool.query("DELETE FROM teacher_constraints WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting teacher constraint with id ${id}:`, error);
      throw error;
    }
  },

  async deleteTeacherConstraintsByTeacherId(teacherId: string): Promise<void> {
    try {
      await pool.query(
        "DELETE FROM teacher_constraints WHERE teacher_id = $1",
        [teacherId],
      );
    } catch (error) {
      console.error(
        `Error deleting constraints for teacher ${teacherId}:`,
        error,
      );
      throw error;
    }
  },
};
