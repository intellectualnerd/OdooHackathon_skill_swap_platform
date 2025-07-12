export interface User {
  user_id: string;
  email: string;
  name: string;
  location?: string;
  availability?: string;
  profile_status?: string;
  image_url?: string;
  is_ban: boolean;
  created_at: string;
  updated_at?: string;
}

export interface SwapRequest {
  request_id: string;
  from_user_id: string;
  to_user_id: string;
  status: 'pending' | 'accepted' | 'cancelled' | 'rejected';
  skill_offered: string;
  skill_wanted: string;
  message: string;
  created_at: string;
  updated_at?: string;
  from_user?: User;
  to_user?: User;
}

export interface Admin {
  id: string;
  admins_email: string;
  created_at: string;
}

export interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface DashboardState {
  users: User[];
  swapRequests: SwapRequest[];
  loading: boolean;
  error: string | null;
  filters: {
    status: string;
    search: string;
  };
}