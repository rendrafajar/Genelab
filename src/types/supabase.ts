export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      classes: {
        Row: {
          created_at: string | null
          department: string
          grade: number
          id: string
          name: string
          student_count: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department: string
          grade: number
          id?: string
          name: string
          student_count: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string
          grade?: number
          id?: string
          name?: string
          student_count?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      room_constraints: {
        Row: {
          available_day: string | null
          created_at: string | null
          department: string | null
          id: string
          room_id: string
          updated_at: string | null
        }
        Insert: {
          available_day?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          room_id: string
          updated_at?: string | null
        }
        Update: {
          available_day?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          room_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_constraints_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          capacity: number
          created_at: string | null
          id: string
          is_active: boolean
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          capacity: number
          created_at?: string | null
          id?: string
          is_active?: boolean
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      schedule_items: {
        Row: {
          class_id: string
          created_at: string | null
          day: string
          id: string
          room_id: string
          schedule_id: string
          subject_id: string
          teacher_id: string
          time_slot_id: string
          updated_at: string | null
        }
        Insert: {
          class_id: string
          created_at?: string | null
          day: string
          id?: string
          room_id: string
          schedule_id: string
          subject_id: string
          teacher_id: string
          time_slot_id: string
          updated_at?: string | null
        }
        Update: {
          class_id?: string
          created_at?: string | null
          day?: string
          id?: string
          room_id?: string
          schedule_id?: string
          subject_id?: string
          teacher_id?: string
          time_slot_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedule_items_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_items_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_items_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_items_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_items_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule_items_time_slot_id_fkey"
            columns: ["time_slot_id"]
            isOneToOne: false
            referencedRelation: "time_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          academic_year: string
          created_at: string | null
          id: string
          name: string
          semester: string
          status: string
          updated_at: string | null
        }
        Insert: {
          academic_year: string
          created_at?: string | null
          id?: string
          name: string
          semester: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          academic_year?: string
          created_at?: string | null
          id?: string
          name?: string
          semester?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subjects: {
        Row: {
          code: string
          created_at: string | null
          department: string
          hours_per_week: number
          id: string
          name: string
          requires_lab: boolean
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          department: string
          hours_per_week: number
          id?: string
          name: string
          requires_lab?: boolean
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          department?: string
          hours_per_week?: number
          id?: string
          name?: string
          requires_lab?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      teacher_constraints: {
        Row: {
          created_at: string | null
          day: string
          end_time: string
          id: string
          is_available: boolean
          start_time: string
          teacher_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day: string
          end_time: string
          id?: string
          is_available?: boolean
          start_time: string
          teacher_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day?: string
          end_time?: string
          id?: string
          is_available?: boolean
          start_time?: string
          teacher_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_constraints_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          created_at: string | null
          department: string
          email: string
          id: string
          max_hours: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department: string
          email: string
          id?: string
          max_hours?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string
          email?: string
          id?: string
          max_hours?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          created_at: string | null
          day: string
          end_time: string
          id: string
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day: string
          end_time: string
          id?: string
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day?: string
          end_time?: string
          id?: string
          start_time?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          name: string
          role: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          last_login?: string | null
          name: string
          role?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          name?: string
          role?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
