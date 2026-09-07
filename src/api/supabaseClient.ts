import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseConfig } from './supabaseConfig';

let clientInstance: SupabaseClient | null = null;

export async function getSupabaseClient(): Promise<SupabaseClient | null> {
  const config = await SupabaseConfig.getConfig();

  if (!config.enabled || !config.url || !config.anonKey || config.anonKey === 'demo-anon-key') {
    return null; // Mock / 로컬 시뮬레이션 모드
  }

  if (!clientInstance) {
    clientInstance = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return clientInstance;
}

export function resetSupabaseClient() {
  clientInstance = null;
}
