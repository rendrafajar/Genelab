import { supabase } from "@/lib/supabase";

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
    const { data, error } = await supabase
      .from("teacher_constraints")
      .select("*")
      .eq("teacher_id", teacherId)
      .order("day")
      .order("start_time");

    if (error) {
      console.error(
        `Error fetching constraints for teacher ${teacherId}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async createTeacherConstraint(
    constraint: Omit<TeacherConstraint, "id">,
  ): Promise<TeacherConstraint> {
    const { data, error } = await supabase
      .from("teacher_constraints")
      .insert([constraint])
      .select()
      .single();

    if (error) {
      console.error("Error creating teacher constraint:", error);
      throw error;
    }

    return data;
  },

  async updateTeacherConstraint(
    id: string,
    constraint: Partial<TeacherConstraint>,
  ): Promise<TeacherConstraint> {
    const { data, error } = await supabase
      .from("teacher_constraints")
      .update(constraint)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating teacher constraint with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteTeacherConstraint(id: string): Promise<void> {
    const { error } = await supabase
      .from("teacher_constraints")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`Error deleting teacher constraint with id ${id}:`, error);
      throw error;
    }
  },

  async deleteTeacherConstraintsByTeacherId(teacherId: string): Promise<void> {
    const { error } = await supabase
      .from("teacher_constraints")
      .delete()
      .eq("teacher_id", teacherId);

    if (error) {
      console.error(
        `Error deleting constraints for teacher ${teacherId}:`,
        error,
      );
      throw error;
    }
  },
};
