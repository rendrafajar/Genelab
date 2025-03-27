import { query } from "@/lib/postgres";

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
      const result = await query(
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
      const result = await query("SELECT * FROM time_slots WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching time slot with id ${id}:`, error);
      throw error;
    }
  },

  async createTimeSlot(timeSlot: Omit<TimeSlot, "id">): Promise<TimeSlot> {
    try {
      const result = await query(
        `INSERT INTO time_slots (day, start_time, end_time, created_at, updated_at) 
         VALUES ($1, $2, $3, NOW(), NOW()) 
         RETURNING *`,
        [timeSlot.day, timeSlot.start_time, timeSlot.end_time],
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
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (timeSlot.day !== undefined) {
        fields.push(`day = $${paramCount}`);
        values.push(timeSlot.day);
        paramCount++;
      }

      if (timeSlot.start_time !== undefined) {
        fields.push(`start_time = $${paramCount}`);
        values.push(timeSlot.start_time);
        paramCount++;
      }

      if (timeSlot.end_time !== undefined) {
        fields.push(`end_time = $${paramCount}`);
        values.push(timeSlot.end_time);
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);

      if (fields.length === 0) {
        return this.getTimeSlotById(id) as Promise<TimeSlot>;
      }

      values.push(id);
      const result = await query(
        `UPDATE time_slots SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
        values,
      );

      return result.rows[0];
    } catch (error) {
      console.error(`Error updating time slot with id ${id}:`, error);
      throw error;
    }
  },

  async deleteTimeSlot(id: string): Promise<void> {
    try {
      await query("DELETE FROM time_slots WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting time slot with id ${id}:`, error);
      throw error;
    }
  },

  async getTimeSlotsByDay(day: string): Promise<TimeSlot[]> {
    try {
      const result = await query(
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
