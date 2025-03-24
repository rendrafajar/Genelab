import { supabase } from "@/lib/supabase";

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
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching schedules:", error);
      throw error;
    }

    return data || [];
  },

  async getScheduleById(id: string): Promise<Schedule | null> {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching schedule with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async createSchedule(schedule: Omit<Schedule, "id">): Promise<Schedule> {
    const { data, error } = await supabase
      .from("schedules")
      .insert([schedule])
      .select()
      .single();

    if (error) {
      console.error("Error creating schedule:", error);
      throw error;
    }

    return data;
  },

  async updateSchedule(
    id: string,
    schedule: Partial<Schedule>,
  ): Promise<Schedule> {
    const { data, error } = await supabase
      .from("schedules")
      .update(schedule)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating schedule with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteSchedule(id: string): Promise<void> {
    const { error } = await supabase.from("schedules").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting schedule with id ${id}:`, error);
      throw error;
    }
  },

  async getActiveSchedule(): Promise<Schedule | null> {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .eq("status", "active")
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is the error code for no rows returned
      console.error("Error fetching active schedule:", error);
      throw error;
    }

    return data || null;
  },

  // Schedule items
  async getScheduleItems(scheduleId: string): Promise<ScheduleItem[]> {
    const { data, error } = await supabase
      .from("schedule_items")
      .select(
        `
        *,
        subject:subject_id(name, code),
        teacher:teacher_id(name),
        class:class_id(name),
        room:room_id(name),
        time_slot:time_slot_id(start_time, end_time)
      `,
      )
      .eq("schedule_id", scheduleId);

    if (error) {
      console.error(`Error fetching items for schedule ${scheduleId}:`, error);
      throw error;
    }

    return data || [];
  },

  async createScheduleItem(
    item: Omit<ScheduleItem, "id">,
  ): Promise<ScheduleItem> {
    const { data, error } = await supabase
      .from("schedule_items")
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error("Error creating schedule item:", error);
      throw error;
    }

    return data;
  },

  async updateScheduleItem(
    id: string,
    item: Partial<ScheduleItem>,
  ): Promise<ScheduleItem> {
    const { data, error } = await supabase
      .from("schedule_items")
      .update(item)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating schedule item with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteScheduleItem(id: string): Promise<void> {
    const { error } = await supabase
      .from("schedule_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`Error deleting schedule item with id ${id}:`, error);
      throw error;
    }
  },

  async getScheduleItemsByClass(
    scheduleId: string,
    classId: string,
  ): Promise<ScheduleItem[]> {
    const { data, error } = await supabase
      .from("schedule_items")
      .select(
        `
        *,
        subject:subject_id(name, code),
        teacher:teacher_id(name),
        class:class_id(name),
        room:room_id(name),
        time_slot:time_slot_id(start_time, end_time)
      `,
      )
      .eq("schedule_id", scheduleId)
      .eq("class_id", classId);

    if (error) {
      console.error(
        `Error fetching items for schedule ${scheduleId} and class ${classId}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getScheduleItemsByTeacher(
    scheduleId: string,
    teacherId: string,
  ): Promise<ScheduleItem[]> {
    const { data, error } = await supabase
      .from("schedule_items")
      .select(
        `
        *,
        subject:subject_id(name, code),
        teacher:teacher_id(name),
        class:class_id(name),
        room:room_id(name),
        time_slot:time_slot_id(start_time, end_time)
      `,
      )
      .eq("schedule_id", scheduleId)
      .eq("teacher_id", teacherId);

    if (error) {
      console.error(
        `Error fetching items for schedule ${scheduleId} and teacher ${teacherId}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },

  async getScheduleItemsByRoom(
    scheduleId: string,
    roomId: string,
  ): Promise<ScheduleItem[]> {
    const { data, error } = await supabase
      .from("schedule_items")
      .select(
        `
        *,
        subject:subject_id(name, code),
        teacher:teacher_id(name),
        class:class_id(name),
        room:room_id(name),
        time_slot:time_slot_id(start_time, end_time)
      `,
      )
      .eq("schedule_id", scheduleId)
      .eq("room_id", roomId);

    if (error) {
      console.error(
        `Error fetching items for schedule ${scheduleId} and room ${roomId}:`,
        error,
      );
      throw error;
    }

    return data || [];
  },
};
