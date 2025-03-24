import { supabase } from "@/lib/supabase";

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
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching subjects:", error);
      throw error;
    }

    return data || [];
  },

  async getSubjectById(id: string): Promise<Subject | null> {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching subject with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async createSubject(subject: Omit<Subject, "id">): Promise<Subject> {
    const { data, error } = await supabase
      .from("subjects")
      .insert([subject])
      .select()
      .single();

    if (error) {
      console.error("Error creating subject:", error);
      throw error;
    }

    return data;
  },

  async updateSubject(id: string, subject: Partial<Subject>): Promise<Subject> {
    const { data, error } = await supabase
      .from("subjects")
      .update(subject)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating subject with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteSubject(id: string): Promise<void> {
    const { error } = await supabase.from("subjects").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting subject with id ${id}:`, error);
      throw error;
    }
  },

  async getSubjectsByDepartment(department: string): Promise<Subject[]> {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("department", department)
      .order("name");

    if (error) {
      console.error(
        `Error fetching subjects from department ${department}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getLabSubjects(): Promise<Subject[]> {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("requires_lab", true)
      .order("name");

    if (error) {
      console.error("Error fetching lab subjects:", error);
      throw error;
    }

    return data || [];
  },
};
