import { query } from "@/lib/postgres";

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
      const result = await query("SELECT * FROM rooms ORDER BY name");
      return result.rows;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  },

  async getRoomById(id: string): Promise<Room | null> {
    try {
      const result = await query("SELECT * FROM rooms WHERE id = $1", [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching room with id ${id}:`, error);
      throw error;
    }
  },

  async createRoom(room: Omit<Room, "id">): Promise<Room> {
    try {
      const result = await query(
        `INSERT INTO rooms (name, type, capacity, is_active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, NOW(), NOW()) 
         RETURNING *`,
        [
          room.name,
          room.type,
          room.capacity,
          room.is_active !== undefined ? room.is_active : true,
        ],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  },

  async updateRoom(id: string, room: Partial<Room>): Promise<Room> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (room.name !== undefined) {
        fields.push(`name = $${paramCount}`);
        values.push(room.name);
        paramCount++;
      }

      if (room.type !== undefined) {
        fields.push(`type = $${paramCount}`);
        values.push(room.type);
        paramCount++;
      }

      if (room.capacity !== undefined) {
        fields.push(`capacity = $${paramCount}`);
        values.push(room.capacity);
        paramCount++;
      }

      if (room.is_active !== undefined) {
        fields.push(`is_active = $${paramCount}`);
        values.push(room.is_active);
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);

      if (fields.length === 0) {
        return this.getRoomById(id) as Promise<Room>;
      }

      values.push(id);
      const result = await query(
        `UPDATE rooms SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
        values,
      );

      return result.rows[0];
    } catch (error) {
      console.error(`Error updating room with id ${id}:`, error);
      throw error;
    }
  },

  async deleteRoom(id: string): Promise<void> {
    try {
      await query("DELETE FROM rooms WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting room with id ${id}:`, error);
      throw error;
    }
  },

  async getRoomsByType(type: string): Promise<Room[]> {
    try {
      const result = await query(
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
      const result = await query(
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
      const result = await query(
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
      const result = await query(
        `INSERT INTO room_constraints (room_id, department, available_day, created_at, updated_at) 
         VALUES ($1, $2, $3, NOW(), NOW()) 
         RETURNING *`,
        [constraint.room_id, constraint.department, constraint.available_day],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating room constraint:", error);
      throw error;
    }
  },

  async deleteRoomConstraint(id: string): Promise<void> {
    try {
      await query("DELETE FROM room_constraints WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting room constraint with id ${id}:`, error);
      throw error;
    }
  },

  async deleteRoomConstraintsByRoomId(roomId: string): Promise<void> {
    try {
      await query("DELETE FROM room_constraints WHERE room_id = $1", [roomId]);
    } catch (error) {
      console.error(`Error deleting constraints for room ${roomId}:`, error);
      throw error;
    }
  },
};
