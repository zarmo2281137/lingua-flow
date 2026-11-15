import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserStats } from '@/types/user';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabaseClient: SupabaseClient | null = null;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_URL.startsWith('https://') &&
    SUPABASE_ANON_KEY &&
    SUPABASE_ANON_KEY.length > 20
  );
};

export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) return null;
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });
  }
  return supabaseClient;
};

// Default ID for single-student platform
export const DEFAULT_STUDENT_ID = 'default_student';

// Fetch progress from Supabase table 'user_progress'
export const fetchCloudProgress = async (
  studentId: string = DEFAULT_STUDENT_ID
): Promise<UserStats | null> => {
  const client = getSupabase();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('user_progress')
      .select('data, updated_at')
      .eq('id', studentId)
      .single();

    if (error || !data) {
      return null;
    }

    return data.data as UserStats;
  } catch (err) {
    console.warn('Supabase fetch error:', err);
    return null;
  }
};

// Save / Upsert progress to Supabase
export const saveCloudProgress = async (
  stats: UserStats,
  studentId: string = DEFAULT_STUDENT_ID
): Promise<boolean> => {
  const client = getSupabase();
  if (!client) return false;

  try {
    const { error } = await client.from('user_progress').upsert(
      {
        id: studentId,
        data: stats,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    if (error) {
      console.warn('Supabase upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase save error:', err);
    return false;
  }
};
