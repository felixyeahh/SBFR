import type { Route } from "./+types/quests";
import { Quests } from "../quests/quests";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SBFR | Baffu" },
    { name: "description", content: "Welcome to Sports Betting For Retards!" },
  ];
}

export default function QuestsPage() {
  return <Quests />;
}
