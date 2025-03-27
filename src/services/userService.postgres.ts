import { query } from "@/lib/postgres";

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
      const result = await query("SELECT * FROM users ORDER BY name");
      return result.rows;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async getUserById(id: string): Promise<User | null> {
    try {
      const result = await query("SELECT * FROM users WHERE id = $1", [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  async createUser(user: Omit<User, "id">): Promise<User> {
    try {
      const result = await query(
        `INSERT INTO users (name, email, role, status, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, NOW(), NOW()) 
         RETURNING *`,
        [user.name, user.email, user.role || "user", user.status || "active"],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (user.name !== undefined) {
        fields.push(`name = $${paramCount}`);
        values.push(user.name);
        paramCount++;
      }

      if (user.email !== undefined) {
        fields.push(`email = $${paramCount}`);
        values.push(user.email);
        paramCount++;
      }

      if (user.role !== undefined) {
        fields.push(`role = $${paramCount}`);
        values.push(user.role);
        paramCount++;
      }

      if (user.last_login !== undefined) {
        fields.push(`last_login = $${paramCount}`);
        values.push(user.last_login);
        paramCount++;
      }

      if (user.status !== undefined) {
        fields.push(`status = $${paramCount}`);
        values.push(user.status);
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);

      if (fields.length === 0) {
        return this.getUserById(id) as Promise<User>;
      }

      values.push(id);
      const result = await query(
        `UPDATE users SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
        values,
      );

      return result.rows[0];
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      await query("DELETE FROM users WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },

  async getUsersByRole(role: "admin" | "user" | "viewer"): Promise<User[]> {
    try {
      const result = await query(
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
      const result = await query(
        "SELECT * FROM users WHERE status = 'active' ORDER BY name",
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching active users:", error);
      throw error;
    }
  },
};
