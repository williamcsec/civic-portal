// Environment variables with fallbacks for demo mode
export const env = {
  SUPABASE_URL: import.meta.env?.VITE_SUPABASE_URL || 'https://demo-project.supabase.co',
  SUPABASE_ANON_KEY: import.meta.env?.VITE_SUPABASE_ANON_KEY || 'demo-anon-key',
  SUPABASE_PROJECT_ID: import.meta.env?.VITE_SUPABASE_PROJECT_ID || 'demo-project-id',
  IS_DEMO_MODE: !import.meta.env?.VITE_SUPABASE_URL || import.meta.env?.VITE_SUPABASE_URL.includes('demo')
};

// Check if we're in demo mode
export const isDemoMode = env.IS_DEMO_MODE;

// Log environment status
if (isDemoMode) {
  console.log('🚀 Running in DEMO mode - Backend features will be simulated');
  console.log('📝 To enable full functionality, set up your Supabase project and API keys');
} else {
  console.log('✅ Running with Supabase backend integration');
}