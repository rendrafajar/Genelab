import { query } from "@/lib/postgres";

export interface Schedule {
  id: string;
  name: string;
  semester: string;
  academic_year: string;
  status: "active" | "draft" | "archived";
  created_at?: string;
  updated_at?: string;
}

export interface ScheduleItem {
  id: string;
  schedule_id: string;
  subject_id: string;
  teacher_id: string;
  class_id: string;
  room_id: string;
  time_slot_id: string;
  day: string;
  created_at?: string;
  updated_at?: string;
  // Joined fields
  subject?: {
    name: string;
    code: string;
  };
  teacher?: {
    name: string;
  };
  class?: {
    name: string;
  };
  room?: {
    name: string;
  };
  time_slot?: {
    start_time: string;
    end_time: string;
  };
}

export const scheduleService = {
  async getSchedules(): Promise<Schedule[]> {
    try {
      const result = await query(
        "SELECT * FROM schedules ORDER BY created_at DESC",
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching schedules:", error);
      throw error;
    }
  },

  async getScheduleById(id: string): Promise<Schedule | null> {
    try {
      const result = await query("SELECT * FROM schedules WHERE id = $1", [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching schedule with id ${id}:`, error);
      throw error;
    }
  },

  async createSchedule(schedule: Omit<Schedule, "id">): Promise<Schedule> {
    try {
      const result = await query(
        `INSERT INTO schedules (name, semester, academic_year, status, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, NOW(), NOW()) 
         RETURNING *`,
        [
          schedule.name,
          schedule.semester,
          schedule.academic_year,
          schedule.status || "draft",
        ],
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating schedule:", error);
      throw error;
    }
  },

  async updateSchedule(
    id: string,
    schedule: Partial<Schedule>,
  ): Promise<Schedule> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (schedule.name !== undefined) {
        fields.push(`name = $${paramCount}`);
        values.push(schedule.name);
        paramCount++;
      }

      if (schedule.semester !== undefined) {
        fields.push(`semester = $${paramCount}`);
        values.push(schedule.semester);
        paramCount++;
      }

      if (schedule.academic_year !== undefined) {
        fields.push(`academic_year = $${paramCount}`);
        values.push(schedule.academic_year);
        paramCount++;
      }

      if (schedule.status !== undefined) {
        fields.push(`status = $${paramCount}`);
        values.push(schedule.status);
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);

      if (fields.length === 0) {
        return this.getScheduleById(id) as Promise<Schedule>;
      }

      values.push(id);
      const result = await query(
        `UPDATE schedules SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
        values,
      );

      return result.rows[0];
    } catch (error) {
      console.error(`Error updating schedule with id ${id}:`, error);
      throw error;
    }
  },

  async deleteSchedule(id: string): Promise<void> {
    try {
      await query("DELETE FROM schedules WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting schedule with id ${id}:`, error);
      throw error;
    }
  },

  async getActiveSchedule(): Promise<Schedule | null> {
    try {
      const result = await query(
        "SELECT * FROM schedules WHERE status = 'active' LIMIT 1",
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error fetching active schedule:", error);
      throw error;
    }
  },

  // Schedule items
  async getScheduleItems(scheduleId: string): Promise<ScheduleItem[]> {
    try {
      const result = await query(
        `SELECT 
          si.*, 
          s.name as subject_name, s.code as subject_code,
          t.name as teacher_name,
          c.name as class_name,
          r.name as room_name,
          ts.start_time, ts.end_time
        FROM schedule_items si
        LEFT JOIN subjects s ON si.subject_id = s.id
        LEFT JOIN teachers t ON si.teacher_id = t.id
        LEFT JOIN classes c ON si.class_id = c.id
        LEFT JOIN rooms r ON si.room_id = r.id
        LEFT JOIN time_slots ts ON si.time_slot_id = ts.id
        WHERE si.schedule_id = $1`,
        [scheduleId],
      );

      // Transform the flat result into the expected structure
      return result.rows.map((row) => ({
        id: row.id,
        schedule_id: row.schedule_id,
        subject_id: row.subject_id,
        teacher_id: row.teacher_id,
        class_id: row.class_id,
        room_id: row.room_id,
        time_slot_id: row.time_slot_id,
        day: row.day,
        created_at: row.created_at,
        updated_at: row.updated_at,
        subject: {
          name: row.subject_name,
          code: row.subject_code,
        },
        teacher: {
          name: row.teacher_name,
        },
        class: {
          name: row.class_name,
        },
        room: {
          name: row.room_name,
        },
        time_slot: {
          start_time: row.start_time,
          end_time: row.end_time,
        },
      }));
    } catch (error) {
      console.error(`Error fetching items for schedule ${scheduleId}:`, error);
      throw error;
    }
  },

  async createScheduleItem(
    item: Omit<ScheduleItem, "id">,
  ): Promise<ScheduleItem> {
    try {
      const result = await query(
        `INSERT INTO schedule_items (schedule_id, subject_id, teacher_id, class_id, room_id, time_slot_id, day, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
         RETURNING *`,
        [
          item.schedule_id,
          item.subject_id,
          item.teacher_id,
          item.class_id,
          item.room_id,
          item.time_slot_id,
          item.day,
        ],
      );

      // Get the full item with joined data
      return this.getScheduleItems(item.schedule_id).then(
        (items) =>
          items.find((i) => i.id === result.rows[0].id) || result.rows[0],
      );
    } catch (error) {
      console.error("Error creating schedule item:", error);
      throw error;
    }
  },

  async updateScheduleItem(
    id: string,
    item: Partial<ScheduleItem>,
  ): Promise<ScheduleItem> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;
      let scheduleId = "";

      if (item.schedule_id !== undefined) {
        fields.push(`schedule_id = $${paramCount}`);
        values.push(item.schedule_id);
        scheduleId = item.schedule_id;
        paramCount++;
      }

      if (item.subject_id !== undefined) {
        fields.push(`subject_id = $${paramCount}`);
        values.push(item.subject_id);
        paramCount++;
      }

      if (item.teacher_id !== undefined) {
        fields.push(`teacher_id = $${paramCount}`);
        values.push(item.teacher_id);
        paramCount++;
      }

      if (item.class_id !== undefined) {
        fields.push(`class_id = $${paramCount}`);
        values.push(item.class_id);
        paramCount++;
      }

      if (item.room_id !== undefined) {
        fields.push(`room_id = $${paramCount}`);
        values.push(item.room_id);
        paramCount++;
      }

      if (item.time_slot_id !== undefined) {
        fields.push(`time_slot_id = $${paramCount}`);
        values.push(item.time_slot_id);
        paramCount++;
      }

      if (item.day !== undefined) {
        fields.push(`day = $${paramCount}`);
        values.push(item.day);
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);

      if (fields.length === 0) {
        // Get the schedule_id for the current item
        const currentItem = await query(
          "SELECT schedule_id FROM schedule_items WHERE id = $1",
          [id],
        );
        scheduleId = currentItem.rows[0].schedule_id;

        // Return the current item with joined data
        const items = await this.getScheduleItems(scheduleId);
        return items.find((i) => i.id === id) as ScheduleItem;
      }

      values.push(id);
      const result = await query(
        `UPDATE schedule_items SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`,
        values,
      );

      // If we don't have the schedule_id from the update, get it from the result
      if (!scheduleId) {
        scheduleId = result.rows[0].schedule_id;
      }

      // Get the full item with joined data
      const items = await this.getScheduleItems(scheduleId);
      return items.find((i) => i.id === id) as ScheduleItem;
    } catch (error) {
      console.error(`Error updating schedule item with id ${id}:`, error);
      throw error;
    }
  },

  async deleteScheduleItem(id: string): Promise<void> {
    try {
      await query("DELETE FROM schedule_items WHERE id = $1", [id]);
    } catch (error) {
      console.error(`Error deleting schedule item with id ${id}:`, error);
      throw error;
    }
  },

  async getScheduleItemsByClass(
    scheduleId: string,
    classId: string,
  ): Promise<ScheduleItem[]> {
    try {
      const result = await query(
        `SELECT 
          si.*, 
          s.name as subject_name, s.code as subject_code,
          t.name as teacher_name,
          c.name as class_name,
          r.name as room_name,
          ts.start_time, ts.end_time
        FROM schedule_items si
        LEFT JOIN subjects s ON si.subject_id = s.id
        LEFT JOIN teachers t ON si.teacher_id = t.id
        LEFT JOIN classes c ON si.class_id = c.id
        LEFT JOIN rooms r ON si.room_id = r.id
        LEFT JOIN time_slots ts ON si.time_slot_id = ts.id
        WHERE si.schedule_id = $1 AND si.class_id = $2`,
        [scheduleId, classId],
      );

      // Transform the flat result into the expected structure
      return result.rows.map((row) => ({
        id: row.id,
        schedule_id: row.schedule_id,
        subject_id: row.subject_id,
        teacher_id: row.teacher_id,
        class_id: row.class_id,
        room_id: row.room_id,
        time_slot_id: row.time_slot_id,
        day: row.day,
        created_at: row.created_at,
        updated_at: row.updated_at,
        subject: {
          name: row.subject_name,
          code: row.subject_code,
        },
        teacher: {
          name: row.teacher_name,
        },
        class: {
          name: row.class_name,
        },
        room: {
          name: row.room_name,
        },
        time_slot: {
          start_time: row.start_time,
          end_time: row.end_time,
        },
      }));
    } catch (error) {
      console.error(
        `Error fetching items for schedule ${scheduleId} and class ${classId}:`,
        error,
      );
      throw error;
    }
  },

  async getScheduleItemsByTeacher(
    scheduleId: string,
    teacherId: string,
  ): Promise<ScheduleItem[]> {
    try {
      const result = await query(
        `SELECT 
          si.*, 
          s.name as subject_name, s.code as subject_code,
          t.name as teacher_name,
          c.name as class_name,
          r.name as room_name,
          ts.start_time, ts.end_time
        FROM schedule_items si
        LEFT JOIN subjects s ON si.subject_id = s.id
        LEFT JOIN teachers t ON si.teacher_id = t.id
        LEFT JOIN classes c ON si.class_id = c.id
        LEFT JOIN rooms r ON si.room_id = r.id
        LEFT JOIN time_slots ts ON si.time_slot_id = ts.id
        WHERE si.schedule_id = $1 AND si.teacher_id = $2`,
        [scheduleId, teacherId],
      );

      // Transform the flat result into the expected structure
      return result.rows.map((row) => ({
        id: row.id,
        schedule_id: row.schedule_id,
        subject_id: row.subject_id,
        teacher_id: row.teacher_id,
        class_id: row.class_id,
        room_id: row.room_id,
        time_slot_id: row.time_slot_id,
        day: row.day,
        created_at: row.created_at,
        updated_at: row.updated_at,
        subject: {
          name: row.subject_name,
          code: row.subject_code,
        },
        teacher: {
          name: row.teacher_name,
        },
        class: {
          name: row.class_name,
        },
        room: {
          name: row.room_name,
        },
        time_slot: {
          start_time: row.start_time,
          end_time: row.end_time,
        },
      }));
    } catch (error) {
      console.error(
        `Error fetching items for schedule ${scheduleId} and teacher ${teacherId}:`,
        error,
      );
      throw error;
    }
  },

  async getScheduleItemsByRoom(
    scheduleId: string,
    roomId: string,
  ): Promise<ScheduleItem[]> {
    try {
      const result = await query(
        `SELECT 
          si.*, 
          s.name as subject_name, s.code as subject_code,
          t.name as teacher_name,
          c.name as class_name,
          r.name as room_name,
          ts.start_time, ts.end_time
        FROM schedule_items si
        LEFT JOIN subjects s ON si.subject_id = s.id
        LEFT JOIN teachers t ON si.teacher_id = t.id
        LEFT JOIN classes c ON si.class_id = c.id
        LEFT JOIN rooms r ON si.room_id = r.id
        LEFT JOIN time_slots ts ON si.time_slot_id = ts.id
        WHERE si.schedule_id = $1 AND si.room_id = $2`,
        [scheduleId, roomId],
      );

      // Transform the flat result into the expected structure
      return result.rows.map((row) => ({
        id: row.id,
        schedule_id: row.schedule_id,
        subject_id: row.subject_id,
        teacher_id: row.teacher_id,
        class_id: row.class_id,
        room_id: row.room_id,
        time_slot_id: row.time_slot_id,
        day: row.day,
        created_at: row.created_at,
        updated_at: row.updated_at,
        subject: {
          name: row.subject_name,
          code: row.subject_code,
        },
        teacher: {
          name: row.teacher_name,
        },
        class: {
          name: row.class_name,
        },
        room: {
          name: row.room_name,
        },
        time_slot: {
          start_time: row.start_time,
          end_time: row.end_time,
        },
      }));
    } catch (error) {
      console.error(
        `Error fetching items for schedule ${scheduleId} and room ${roomId}:`,
        error,
      );
      throw error;
    }
  },
};
