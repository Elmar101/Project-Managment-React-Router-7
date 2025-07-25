import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  layout("routes/pages/layout.tsx", [
    ...prefix("pages", [
      route("home", "routes/pages/home/index.tsx"),
      route("profile", "routes/pages/profile/index.tsx"),
      route("dashboard", "routes/pages/dashboard/index.tsx"),
    ]),
  ]),
  layout("routes/auth/layout.tsx", [
    ...prefix("auth", [
      route("sign-in", "routes/auth/sign-in.tsx"),
      route("sign-up", "routes/auth/sign-up.tsx"),
      route("forgot-password", "routes/auth/forgot-password.tsx"),
      route("reset-password", "routes/auth/reset-password.tsx"),
      route("verify-email", "routes/auth/verify-email.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
