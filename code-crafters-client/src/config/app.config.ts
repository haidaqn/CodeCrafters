export const appConfig = {
  apiBase: process.env.NEXT_PUBLIC_API_BASE,
  auth: {
    googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  },
  recaptcha: {
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
};

export const location = typeof window !== 'undefined' ? window.location : null;


export const isTenant = false;

export const matchCurrency = {
  vnd: 'đ',
  eur: '€',
  usd: '$',
};
