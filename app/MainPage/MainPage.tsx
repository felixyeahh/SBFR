import type { Route } from "./+types/MainPage";
import DefaultHeader from "~/tools/DefaultHeader";
import { MiniLeaderboard } from "./MiniLeaderboard";
import { userdb } from "~/tools/database/userdb";
import { ScrollRestoration, useLoaderData } from "react-router";
import { NewWagerCreationGrid } from "./NewWagerGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SBFR | Baffu" },
    { name: "description", content: "Welcome to ʂ𝓅Ｏ𝔯τ𝔰 𝔅εττ𝔦𝔫𝔤 𝔉𝔬𝔯 ℛετα𝔯𝕕ˢ" },
  ];
}

export async function loader() {
    const users = await userdb.getAll();
    return { users };
}

export default function MainPage() {
    const { users } = useLoaderData<typeof loader>();

    return (
        <div className="page">
            <DefaultHeader />

            <div className="main-grid" style={{ display: (false) ? "none" : "grid" }}>

                <MiniLeaderboard users={users} maxLength={5} />
                <NewWagerCreationGrid users={users.map((user) => [user.id, user.points])}/>

                <button className="button wagers" onClick={() => { window.location.href = "/wagers" }}>&gt; Wagers</button>
                <button className="button quests" onClick={() => { window.location.href = "/quests" }}>&gt; Quests</button>
            </div>

            <ScrollRestoration />
        </div>
    );
}
