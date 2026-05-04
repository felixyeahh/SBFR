import type { Route } from "./+types/login";
import { Login } from "../login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login for People (Maybe)" },
    { name: "description", content: "Welcome to Sports Betting For Retards!" },
  ];
}

export default function LoginPage() {
  return <Login />;
}
