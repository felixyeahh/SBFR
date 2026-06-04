import DefaultHeader from "../../tools/DefaultHeader"

export default function PokerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <DefaultHeader backbutton />
            {children}
        </div>
    )
}
