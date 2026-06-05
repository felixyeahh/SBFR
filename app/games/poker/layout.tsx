import DefaultHeader from "@/app/components/DefaultHeader"

export default function PokerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <DefaultHeader backbutton />
            {children}
        </div>
    )
}
