export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
        };
        Update: {
          email?: string;
          first_name?: string;
          last_name?: string;
        };
      };
    };
  };
};
