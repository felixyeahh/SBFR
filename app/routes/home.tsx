import type { Route } from "./+types/home";
import { Main } from "../main/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sports Betting For Retards" },
    { name: "description", content: "Welcome to Sports Betting For Retards!" },
  ];
}

export default function Home() {
  return <Main />;
}
