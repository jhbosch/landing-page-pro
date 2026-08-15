export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          count: number
          created_at: string
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          name: string
          sort_order: number
          status: string
          updated_at: string
        }
        Insert: {
          count?: number
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Update: {
          count?: number
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_config: {
        Row: {
          address: string
          created_at?: string
          email: string
          facebook_url: string | null
          id: string
          instagram_url: string | null
          map_url: string | null
          phone: string
          site_name: string
          twitter_url: string | null
          updated_at: string
          whatsapp: string
          youtube_url: string | null
        }
        Insert: {
          address?: string
          created_at?: string
          email?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          map_url?: string | null
          phone?: string
          site_name?: string
          twitter_url?: string | null
          updated_at?: string
          whatsapp?: string
          youtube_url?: string | null
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          map_url?: string | null
          phone?: string
          site_name?: string
          twitter_url?: string | null
          updated_at?: string
          whatsapp?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          id: string
          interest: string | null
          message: string | null
          name: string
          phone: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          interest?: string | null
          message?: string | null
          name: string
          phone?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          interest?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          status?: string
        }
        Relationships: []
      }
      offers: {
        Row: {
          created_at: string
          description: string | null
          discount: string | null
          ends_at: string | null
          id: string
          image_url: string | null
          original_price: number | null
          price: number | null
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          original_price?: number | null
          price?: number | null
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          discount?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          original_price?: number | null
          price?: number | null
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          badge: string | null
          brand: string | null
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_best_seller: boolean
          is_featured: boolean
          is_new_arrival: boolean
          name: string
          original_price: number | null
          price: number
          rating: number
          reviews: number
          sort_order: number
          specs: string[]
          status: string
          updated_at: string
          year: string | null
        }
        Insert: {
          badge?: string | null
          brand?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_best_seller?: boolean
          is_featured?: boolean
          is_new_arrival?: boolean
          name: string
          original_price?: number | null
          price: number
          rating?: number
          reviews?: number
          sort_order?: number
          specs?: string[]
          status?: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          badge?: string | null
          brand?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_best_seller?: boolean
          is_featured?: boolean
          is_new_arrival?: boolean
          name?: string
          original_price?: number | null
          price?: number
          rating?: number
          reviews?: number
          sort_order?: number
          specs?: string[]
          status?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      statistics: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          label: string
          sort_order: number
          status: string
          suffix: string | null
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          label: string
          sort_order?: number
          status?: string
          suffix?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          label?: string
          sort_order?: number
          status?: string
          suffix?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          content: string
          created_at: string
          id: string
          name: string
          rating: number | null
          role: string | null
          sort_order: number
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          content: string
          created_at?: string
          id?: string
          name: string
          rating?: number | null
          role?: string | null
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          content?: string
          created_at?: string
          id?: string
          name?: string
          rating?: number | null
          role?: string | null
          sort_order?: number
          status?: string
          updated_at?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
