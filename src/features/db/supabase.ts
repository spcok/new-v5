import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bu9xxq977l98.share.zrok.io/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder_anon_key_until_provided';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
