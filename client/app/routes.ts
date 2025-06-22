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
      // route("settings", "routes/pages/settings/index.tsx"),
      // route("tasks", "routes/pages/tasks/index.tsx"),
      // route("task/:taskId", "routes/pages/tasks/task/[taskId].tsx"),
      // route("task/:taskId/edit", "routes/pages/tasks/task/[taskId]/edit.tsx"),
      // route("task/:taskId/comments", "routes/pages/tasks/task/[taskId]/comments.tsx"),
      // route("task/:taskId/attachments", "routes/pages/tasks/task/[taskId]/attachments.tsx"),
      // route("task/:taskId/history", "routes/pages/tasks/task/[taskId]/history.tsx"),
      // route("task/:taskId/assignees", "routes/pages/tasks/task/[taskId]/assignees.tsx"),
      // route("task/:taskId/labels", "routes/pages/tasks/task/[taskId]/labels.tsx"),
      // route("task/:taskId/subtasks", "routes/pages/tasks/task/[taskId]/subtasks.tsx"),
      // route("task/:taskId/priority", "routes/pages/tasks/task/[taskId]/priority.tsx"),
      // route("task/:taskId/status", "routes/pages/tasks/task/[taskId]/status.tsx"),
      // route("task/:taskId/dependencies", "routes/pages/tasks/task/[taskId]/dependencies.tsx"),
      // route("task/:taskId/recurrence", "routes/pages/tasks/task/[taskId]/recurrence.tsx"),
    ]),
  ]),
  layout("routes/auth/layout.tsx", [
    ...prefix("auth", [
      route("sign-in", "routes/auth/sign-in.tsx"),
      route("sign-up", "routes/auth/sign-up.tsx"),
      route("forgot-password", "routes/auth/forgot-password.tsx"),
      route("reset-password", "routes/auth/reset-password.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
