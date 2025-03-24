import { supabase } from "@/lib/supabase";

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
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching teachers:", error);
      throw error;
    }

    return data || [];
  },

  async getTeacherById(id: string): Promise<Teacher | null> {
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching teacher with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async createTeacher(teacher: Omit<Teacher, "id">): Promise<Teacher> {
    const { data, error } = await supabase
      .from("teachers")
      .insert([teacher])
      .select()
      .single();

    if (error) {
      console.error("Error creating teacher:", error);
      throw error;
    }

    return data;
  },

  async updateTeacher(id: string, teacher: Partial<Teacher>): Promise<Teacher> {
    const { data, error } = await supabase
      .from("teachers")
      .update(teacher)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating teacher with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteTeacher(id: string): Promise<void> {
    const { error } = await supabase.from("teachers").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting teacher with id ${id}:`, error);
      throw error;
    }
  },

  async getTeachersByDepartment(department: string): Promise<Teacher[]> {
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .eq("department", department)
      .order("name");

    if (error) {
      console.error(
        `Error fetching teachers from department ${department}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },
};
