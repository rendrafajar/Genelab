import { supabase } from "@/lib/supabase";

export interface TimeSlot {
  id: string;
  day: string;
  start_time: string;
  end_time: string;
  created_at?: string;
  updated_at?: string;
}

export const timeSlotService = {
  async getTimeSlots(): Promise<TimeSlot[]> {
    const { data, error } = await supabase
      .from("time_slots")
      .select("*")
      .order("day")
      .order("start_time");

    if (error) {
      console.error("Error fetching time slots:", error);
      throw error;
    }

    return data || [];
  },

  async getTimeSlotById(id: string): Promise<TimeSlot | null> {
    const { data, error } = await supabase
      .from("time_slots")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching time slot with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async createTimeSlot(timeSlot: Omit<TimeSlot, "id">): Promise<TimeSlot> {
    const { data, error } = await supabase
      .from("time_slots")
      .insert([timeSlot])
      .select()
      .single();

    if (error) {
      console.error("Error creating time slot:", error);
      throw error;
    }

    return data;
  },

  async updateTimeSlot(
    id: string,
    timeSlot: Partial<TimeSlot>,
  ): Promise<TimeSlot> {
    const { data, error } = await supabase
      .from("time_slots")
      .update(timeSlot)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating time slot with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteTimeSlot(id: string): Promise<void> {
    const { error } = await supabase.from("time_slots").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting time slot with id ${id}:`, error);
      throw error;
    }
  },

  async getTimeSlotsByDay(day: string): Promise<TimeSlot[]> {
    const { data, error } = await supabase
      .from("time_slots")
      .select("*")
      .eq("day", day)
      .order("start_time");

    if (error) {
      console.error(`Error fetching time slots for day ${day}:`, error);
      throw error;
    }

    return data || [];
  },
};
