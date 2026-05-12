/**
 * Centralized environment variable handling.
 * Only variables prefixed with VITE_ are exposed to the client.
 */

const getEnv = (key: string, fallback = ""): string => {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  return (value as string | undefined) ?? fallback;
};

const requireEnv = (key: string): string => {
  const value = getEnv(key);
  if (!value && import.meta.env.PROD) {
    console.warn(`[env] Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  mode: import.meta.env.MODE,
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,

  siteUrl: getEnv("VITE_SITE_URL", "https://www.fcsafetyconsultants.co.za"),
  apiUrl: getEnv("VITE_API_URL", ""),
  contactEmail: getEnv("VITE_CONTACT_EMAIL", "fcsafetyconsultants@outlook.com"),
} as const;

export { getEnv, requireEnv };
