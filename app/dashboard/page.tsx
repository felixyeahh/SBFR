"use client";
import Link from "next/link";
import { useUser } from "../components/userContext";

export default function Dashboard() {    
    const { user } = useUser();
    if (user === null) return <></>;

    return (
        <div>
            <Link href="/dashboard/admin" className="button" style={{fontSize: "2rem", marginTop: "10vh", display: user.isAdmin ? "block" : "none"}}>Admin Dashboard</Link>
        </div>
    )
}
