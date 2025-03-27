import pool from "@/lib/database";

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
    try {
      const result = await pool.query("SELECT * FROM users ORDER BY name");
      return result.rows;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async getUserById(id: string): Promise<User | null> {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  async createUser(user: Omit<User, "id">): Promise<User> {
    try {
      const { name, email, role, status } = user;
      const result = await pool.query(
        "INSERT INTO users (name, email, role, status) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, role, status],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    try {
      const { name, email, role, status, last_login } = user;
      const result = await pool.query(
        "UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), role = COALESCE($3, role), status = COALESCE($4, status), last_login = COALESCE($5, last_login), updated_at = NOW() WHERE id = $6 RETURNING *",
        [name, email, role, status, last_login, id],
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      await pool.query("DELETE FROM users WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },

  async getUsersByRole(role: "admin" | "user" | "viewer"): Promise<User[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE role = $1 ORDER BY name",
        [role],
      );
      return result.rows;
    } catch (error) {
      console.error(`Error fetching users with role ${role}:`, error);
      throw error;
    }
  },

  async getActiveUsers(): Promise<User[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE status = $1 ORDER BY name",
        ["active"],
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching active users:", error);
      throw error;
    }
  },
};
