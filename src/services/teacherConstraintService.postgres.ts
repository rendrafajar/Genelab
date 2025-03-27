import { query } from "@/lib/postgres";

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
      const result = await query(
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
      const result = await query(
        `INSERT INTO teacher_constraints (teacher_id, day, start_time, end_time, is_available, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
         RETURNING *`,
        [
          constraint.teacher_id,
          constraint.day,
          constraint.start_time,
          constraint.end_time,
          constraint.is_available !== undefined
            ? constraint.is_available
            : true,
        ],
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
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (constraint.teacher_id !== undefined) {
        fields.push(`teacher_id = $${paramCount}`);
        values.push(constraint.teacher_id);
        paramCount++;
      }

      if (constraint.day !== undefined) {
        fields.push(`day = $${paramCount}`);
        values.push(constraint.day);
        paramCount++;
      }

      if (constraint.start_time !== undefined) {
        fields.push(`start_time = $${paramCount}`);
        values.push(constraint.start_time);
        paramCount++;
      }

      if (constraint.end_time !== undefined) {
        fields.push(`end_time = $${paramCount}`);
        values.push(constraint.end_time);
        paramCount++;
      }

      if (constraint.is_available !== undefined) {
        fields.push(`is_available = $${paramCount}`);
        values.push(constraint.is_available);
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);

      if (fields.length === 0) {
        const result = await query(
          "SELECT * FROM teacher_constraints WHERE id = $1",
          [id],
        );
        return result.rows[0];
      }

      values.push(id);
      const result = await query(
        `UPDATE teacher_constraints SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
        values,
      );

      return result.rows[0];
    } catch (error) {
      console.error(`Error updating teacher constraint with id ${id}:`, error);
      throw error;
    }
  },

  async deleteTeacherConstraint(id: string): Promise<void> {
    try {
      await query("DELETE FROM teacher_constraints WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting teacher constraint with id ${id}:`, error);
      throw error;
    }
  },

  async deleteTeacherConstraintsByTeacherId(teacherId: string): Promise<void> {
    try {
      await query("DELETE FROM teacher_constraints WHERE teacher_id = $1", [
        teacherId,
      ]);
    } catch (error) {
      console.error(
        `Error deleting constraints for teacher ${teacherId}:`,
        error,
      );
      throw error;
    }
  },
};
