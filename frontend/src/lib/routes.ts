export const APP_ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  userLogin: "/login?role=USER",
  agentLogin: "/login?role=AGENT",
  adminLogin: "/login?role=ADMIN",
  userRegister: "/register?role=USER",
  agentRegister: "/register?role=AGENT",
  guides: "/guides",
  userDashboard: "/user",
  agentDashboard: "/agent",
  adminDashboard: "/admin"
} as const;

export const defaultDashboardByRole = (role: "USER" | "AGENT" | "ADMIN") => {
  if (role === "AGENT") return APP_ROUTES.agentDashboard;
  if (role === "ADMIN") return APP_ROUTES.adminDashboard;
  return APP_ROUTES.userDashboard;
};

export const loginRouteByRole = (role: "USER" | "AGENT" | "ADMIN") => {
  if (role === "AGENT") return APP_ROUTES.agentLogin;
  if (role === "ADMIN") return APP_ROUTES.adminLogin;
  return APP_ROUTES.userLogin;
};
