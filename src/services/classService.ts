import { supabase } from "@/lib/supabase";

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
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }

    return data || [];
  },

  async getClassById(id: string): Promise<Class | null> {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching class with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async createClass(classData: Omit<Class, "id">): Promise<Class> {
    const { data, error } = await supabase
      .from("classes")
      .insert([classData])
      .select()
      .single();

    if (error) {
      console.error("Error creating class:", error);
      throw error;
    }

    return data;
  },

  async updateClass(id: string, classData: Partial<Class>): Promise<Class> {
    const { data, error } = await supabase
      .from("classes")
      .update(classData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating class with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteClass(id: string): Promise<void> {
    const { error } = await supabase.from("classes").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting class with id ${id}:`, error);
      throw error;
    }
  },

  async getClassesByDepartment(department: string): Promise<Class[]> {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("department", department)
      .order("name");

    if (error) {
      console.error(
        `Error fetching classes from department ${department}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getClassesByGrade(grade: number): Promise<Class[]> {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("grade", grade)
      .order("name");

    if (error) {
      console.error(`Error fetching classes from grade ${grade}:`, error);
      throw error;
    }

    return data || [];
  },
};
