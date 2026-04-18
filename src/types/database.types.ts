export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string
          username: string
          password: string
          region: string
          current_rank: string
          target_rank: string
          status: string
          notes: string | null
          login_email: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          username: string
          password: string
          region: string
          current_rank: string
          target_rank: string
          status: string
          notes?: string | null
          login_email: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          id?: string
          username?: string
          password?: string
          region?: string
          current_rank?: string
          target_rank?: string
          status?: string
          notes?: string | null
          login_email?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
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
