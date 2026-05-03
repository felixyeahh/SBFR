import type { Route } from "./+types/wagers";
import { Wagers } from "~/wagers/wagers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wagers For Retards" },
    { name: "description", content: "Welcome to Sports Betting For Retards!" },
  ];
}

export default function WagersPage() {
  return <Wagers />;
}
