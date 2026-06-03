import type { Route } from "./+types/MainPage";
import DefaultHeader from "~/tools/DefaultHeader";
import { MiniLeaderboard } from "./MiniLeaderboard";
import { userdb } from "~/tools/database/userdb";
import { ScrollRestoration, useLoaderData, Link } from "react-router";
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

            <div className="main-grid" style={{ display: "grid" }}>

                <MiniLeaderboard users={users} maxLength={5} />
                <NewWagerCreationGrid users={users.map((user, index) => [user.id, user.points])}/>

                <Link to="/wagers" className="button wagers">&gt; Wagers</Link>
                <Link to="/quests" className="button quests">&gt; Quests</Link>
            </div>

            <ScrollRestoration />
        </div>
    );
}
