import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          company?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          stage: string | null
          service_interest: string | null
          source_page: string | null
          message: string | null
          status: string
          created_at: string
          updated_at: string
          quiz_answers: Record<string, string> | null
          ai_assessment: Record<string, any> | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          stage?: string | null
          service_interest?: string | null
          source_page?: string | null
          message?: string | null
          status?: string
          created_at?: string
          updated_at?: string
          quiz_answers?: Record<string, string> | null
          ai_assessment?: Record<string, any> | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          stage?: string | null
          service_interest?: string | null
          source_page?: string | null
          message?: string | null
          status?: string
          created_at?: string
          updated_at?: string
          quiz_answers?: Record<string, string> | null
          ai_assessment?: Record<string, any> | null
        }
      }
    }
  }
}
