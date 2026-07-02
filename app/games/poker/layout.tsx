import DefaultHeader from "@/app/components/DefaultHeader"
import "./poker.css";

export default function PokerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <DefaultHeader backbutton />
            {children}
        </div>
    )
}
