import pool from "@/lib/database";

export interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface RoomConstraint {
  id: string;
  room_id: string;
  department?: string;
  available_day?: string;
  created_at?: string;
  updated_at?: string;
}

export const roomService = {
  async getRooms(): Promise<Room[]> {
    try {
      const result = await pool.query("SELECT * FROM rooms ORDER BY name");
      return result.rows;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  },

  async getRoomById(id: string): Promise<Room | null> {
    try {
      const result = await pool.query("SELECT * FROM rooms WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching room with id ${id}:`, error);
      throw error;
    }
  },

  async createRoom(room: Omit<Room, "id">): Promise<Room> {
    try {
      const { name, type, capacity, is_active } = room;
      const result = await pool.query(
        "INSERT INTO rooms (name, type, capacity, is_active) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, type, capacity, is_active],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  },

  async updateRoom(id: string, room: Partial<Room>): Promise<Room> {
    try {
      const { name, type, capacity, is_active } = room;
      const result = await pool.query(
        "UPDATE rooms SET name = COALESCE($1, name), type = COALESCE($2, type), capacity = COALESCE($3, capacity), is_active = COALESCE($4, is_active), updated_at = NOW() WHERE id = $5 RETURNING *",
        [name, type, capacity, is_active, id],
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating room with id ${id}:`, error);
      throw error;
    }
  },

  async deleteRoom(id: string): Promise<void> {
    try {
      await pool.query("DELETE FROM rooms WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting room with id ${id}:`, error);
      throw error;
    }
  },

  async getRoomsByType(type: string): Promise<Room[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM rooms WHERE type = $1 ORDER BY name",
        [type],
      );
      return result.rows;
    } catch (error) {
      console.error(`Error fetching rooms of type ${type}:`, error);
      throw error;
    }
  },

  async getActiveRooms(): Promise<Room[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM rooms WHERE is_active = true ORDER BY name",
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching active rooms:", error);
      throw error;
    }
  },

  // Room constraints
  async getRoomConstraints(roomId: string): Promise<RoomConstraint[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM room_constraints WHERE room_id = $1",
        [roomId],
      );
      return result.rows;
    } catch (error) {
      console.error(`Error fetching constraints for room ${roomId}:`, error);
      throw error;
    }
  },

  async createRoomConstraint(
    constraint: Omit<RoomConstraint, "id">,
  ): Promise<RoomConstraint> {
    try {
      const { room_id, department, available_day } = constraint;
      const result = await pool.query(
        "INSERT INTO room_constraints (room_id, department, available_day) VALUES ($1, $2, $3) RETURNING *",
        [room_id, department, available_day],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating room constraint:", error);
      throw error;
    }
  },

  async deleteRoomConstraint(id: string): Promise<void> {
    try {
      await pool.query("DELETE FROM room_constraints WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting room constraint with id ${id}:`, error);
      throw error;
    }
  },

  async deleteRoomConstraintsByRoomId(roomId: string): Promise<void> {
    try {
      await pool.query("DELETE FROM room_constraints WHERE room_id = $1", [
        roomId,
      ]);
    } catch (error) {
      console.error(`Error deleting constraints for room ${roomId}:`, error);
      throw error;
    }
  },
};
