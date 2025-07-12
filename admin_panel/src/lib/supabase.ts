import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin authentication
export const adminAuth = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase
      .from('admin_table')
      .select('*')
      .eq('admin_email', email)
      .single();

    if (error || !data) {
      throw new Error('Invalid admin credentials');
    }

    // In a real app, you'd verify the hashed password here
    // For demo purposes, we'll assume the password verification is handled
    return data;
  },

  checkIsAdmin: async (email: string) => {
    const { data, error } = await supabase
      .from('admin_table')
      .select('*')
      .eq('admins_email', email)
      .single();

    return !error && data;
  }
};

// User management
export const userService = {
  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('user_profile')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  banUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profile')
      .update({ is_ban: true, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  unbanUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profile')
      .update({ is_ban: false, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }
};

// Swap request management
export const swapRequestService = {
  getAllSwapRequests: async () => {
    const { data, error } = await supabase
      .from('swap_requests')
      .select(`
        *,
          from_user:user_profile!from_user_id(*),
          to_user:user_profile!to_user_id(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  updateSwapRequestStatus: async (requestId: string, status: string) => {
    const { data, error } = await supabase
      .from('swap_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('request_id', requestId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  rejectSwapRequest: async (requestId: string) => {
    return swapRequestService.updateSwapRequestStatus(requestId, 'rejected');
  }
};