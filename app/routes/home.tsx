import type { Route } from "./+types/home";
import { Main } from "../main/main";
import { adminDb } from "../components/admindb";
import { Users } from "../components/constants";
import { useState } from "react";
import { onSubmitContext } from "~/main/onSubmitHandler";

export async function loader() {
    const leaderboardSnapshot = await adminDb.collection(Users.COLLECTION).get();
    const leaderboard: {[key: string]: number} = {};

    leaderboardSnapshot.forEach((doc) => {
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

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <onSubmitContext.Provider value={{isOpen, setIsOpen}}>
      <Main />
    </onSubmitContext.Provider>
  );
}
