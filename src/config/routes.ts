export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  POSTULATIONS: '/postulations',
  POSTULATION_DETAIL: '/detail/:id',
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.POSTULATIONS,
  ROUTES.POSTULATION_DETAIL,
] as const; 