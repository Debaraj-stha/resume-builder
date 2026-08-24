import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

const configurationError = {
  message: "Account services are temporarily unavailable. Please try again later.",
};

const createUnavailableQuery = () => {
  const result = { data: null, error: configurationError };
  const query = {
    select: () => query,
    upsert: () => query,
    eq: () => query,
    order: () => query,
    limit: () => query,
    in: () => query,
    then: (resolve) => Promise.resolve(result).then(resolve),
  };
  return query;
};

const unavailableClient = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signOut: async () => ({ error: null }),
    signInWithOAuth: async () => ({ data: null, error: configurationError }),
    signInWithIdToken: async () => ({ data: null, error: configurationError }),
    signInWithOtp: async () => ({ data: null, error: configurationError }),
    signInWithPassword: async () => ({ data: null, error: configurationError }),
    signUp: async () => ({ data: null, error: configurationError }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => createUnavailableQuery(),
  storage: {
    from: () => ({
      list: async () => ({ data: [], error: configurationError }),
      createSignedUrl: async () => ({ data: null, error: configurationError }),
      createSignedUploadUrl: async () => ({ data: null, error: configurationError }),
    }),
  },
};

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "implicit",
      },
    })
  : unavailableClient;

export default supabase;
