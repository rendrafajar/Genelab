import { supabase } from "@/lib/supabase";

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
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }

    return data || [];
  },

  async getRoomById(id: string): Promise<Room | null> {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching room with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async createRoom(room: Omit<Room, "id">): Promise<Room> {
    const { data, error } = await supabase
      .from("rooms")
      .insert([room])
      .select()
      .single();

    if (error) {
      console.error("Error creating room:", error);
      throw error;
    }

    return data;
  },

  async updateRoom(id: string, room: Partial<Room>): Promise<Room> {
    const { data, error } = await supabase
      .from("rooms")
      .update(room)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating room with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteRoom(id: string): Promise<void> {
    const { error } = await supabase.from("rooms").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting room with id ${id}:`, error);
      throw error;
    }
  },

  async getRoomsByType(type: string): Promise<Room[]> {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("type", type)
      .order("name");

    if (error) {
      console.error(`Error fetching rooms of type ${type}:`, error);
      throw error;
    }

    return data || [];
  },

  async getActiveRooms(): Promise<Room[]> {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("is_active", true)
      .order("name");

    if (error) {
      console.error("Error fetching active rooms:", error);
      throw error;
    }

    return data || [];
  },

  // Room constraints
  async getRoomConstraints(roomId: string): Promise<RoomConstraint[]> {
    const { data, error } = await supabase
      .from("room_constraints")
      .select("*")
      .eq("room_id", roomId);

    if (error) {
      console.error(`Error fetching constraints for room ${roomId}:`, error);
      throw error;
    }

    return data || [];
  },

  async createRoomConstraint(
    constraint: Omit<RoomConstraint, "id">,
  ): Promise<RoomConstraint> {
    const { data, error } = await supabase
      .from("room_constraints")
      .insert([constraint])
      .select()
      .single();

    if (error) {
      console.error("Error creating room constraint:", error);
      throw error;
    }

    return data;
  },

  async deleteRoomConstraint(id: string): Promise<void> {
    const { error } = await supabase
      .from("room_constraints")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`Error deleting room constraint with id ${id}:`, error);
      throw error;
    }
  },

  async deleteRoomConstraintsByRoomId(roomId: string): Promise<void> {
    const { error } = await supabase
      .from("room_constraints")
      .delete()
      .eq("room_id", roomId);

    if (error) {
      console.error(`Error deleting constraints for room ${roomId}:`, error);
      throw error;
    }
  },
};
