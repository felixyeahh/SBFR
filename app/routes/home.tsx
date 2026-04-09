import type { Route } from "./+types/home";
import { Main } from "../main/main";
import { db } from "../components/firebase";
import { Users } from "../components/constants";

export async function loader() {
    const snapshot = await db.collection(Users.COLLECTION).get();
    const leaderboard: {[key: string]: number} = {};
    snapshot.forEach((doc) => {
        leaderboard[doc.id] = doc.data()[Users.POINTS];
    });
    return leaderboard;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sports Betting For Retards" },
    { name: "description", content: "Welcome to Sports Betting For Retards!" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Main leaderboard={loaderData} />;
}
