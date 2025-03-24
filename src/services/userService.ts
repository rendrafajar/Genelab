import { supabase } from "@/lib/supabase";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
  last_login?: string;
  status: "active" | "inactive";
  created_at?: string;
  updated_at?: string;
}

export const userService = {
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching users:", error);
      throw error;
    }

    return data || [];
  },

  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async createUser(user: Omit<User, "id">): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .insert([user])
      .select()
      .single();

    if (error) {
      console.error("Error creating user:", error);
      throw error;
    }

    return data;
  },

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .update(user)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },

  async getUsersByRole(role: "admin" | "user" | "viewer"): Promise<User[]> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", role)
      .order("name");

    if (error) {
      console.error(`Error fetching users with role ${role}:`, error);
      throw error;
    }

    return data || [];
  },

  async getActiveUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("status", "active")
      .order("name");

    if (error) {
      console.error("Error fetching active users:", error);
      throw error;
    }

    return data || [];
  },
};
