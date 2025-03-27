import pool from "@/lib/database";

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
    try {
      const result = await pool.query(
        "SELECT * FROM time_slots ORDER BY day, start_time",
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching time slots:", error);
      throw error;
    }
  },

  async getTimeSlotById(id: string): Promise<TimeSlot | null> {
    try {
      const result = await pool.query(
        "SELECT * FROM time_slots WHERE id = $1",
        [id],
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching time slot with id ${id}:`, error);
      throw error;
    }
  },

  async createTimeSlot(timeSlot: Omit<TimeSlot, "id">): Promise<TimeSlot> {
    try {
      const { day, start_time, end_time } = timeSlot;
      const result = await pool.query(
        "INSERT INTO time_slots (day, start_time, end_time) VALUES ($1, $2, $3) RETURNING *",
        [day, start_time, end_time],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating time slot:", error);
      throw error;
    }
  },

  async updateTimeSlot(
    id: string,
    timeSlot: Partial<TimeSlot>,
  ): Promise<TimeSlot> {
    try {
      const { day, start_time, end_time } = timeSlot;
      const result = await pool.query(
        "UPDATE time_slots SET day = COALESCE($1, day), start_time = COALESCE($2, start_time), end_time = COALESCE($3, end_time), updated_at = NOW() WHERE id = $4 RETURNING *",
        [day, start_time, end_time, id],
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error updating time slot with id ${id}:`, error);
      throw error;
    }
  },

  async deleteTimeSlot(id: string): Promise<void> {
    try {
      await pool.query("DELETE FROM time_slots WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting time slot with id ${id}:`, error);
      throw error;
    }
  },

  async getTimeSlotsByDay(day: string): Promise<TimeSlot[]> {
    try {
      const result = await pool.query(
        "SELECT * FROM time_slots WHERE day = $1 ORDER BY start_time",
        [day],
      );
      return result.rows;
    } catch (error) {
      console.error(`Error fetching time slots for day ${day}:`, error);
      throw error;
    }
  },
};
