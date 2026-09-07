import { LocalStorage } from '../storage/localStorage';

export const SUPABASE_STORAGE_KEY = '@supabase_credentials';

export interface SupabaseCredentials {
  url: string;
  anonKey: string;
  enabled: boolean;
}

export const DEFAULT_SUPABASE_CONFIG: SupabaseCredentials = {
  url: 'https://demo-jungcheogi.supabase.co',
  anonKey: 'demo-anon-key',
  enabled: false,
};

export class SupabaseConfig {
  static async getConfig(): Promise<SupabaseCredentials> {
    const saved = await LocalStorage.getItem<SupabaseCredentials>(SUPABASE_STORAGE_KEY);
    return saved || DEFAULT_SUPABASE_CONFIG;
  }

  static async saveConfig(config: SupabaseCredentials): Promise<void> {
    await LocalStorage.setItem(SUPABASE_STORAGE_KEY, config);
  }
}
