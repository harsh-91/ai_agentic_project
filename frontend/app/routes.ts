import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./index.tsx"),
  route("chatbot", "./chatbot.tsx"),
  route("rag", "./rag.tsx"),
  route("user", "./user.tsx"),
  route("observability", "./observability.tsx"),
  route("compliance", "./compliance.tsx"),
  route("/.well-known/appspecific/com.chrome.devtools.json", "./debug-null.tsx")
] satisfies RouteConfig;
