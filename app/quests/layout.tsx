import DefaultHeader from "../tools/DefaultHeader";

export default function QuestsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="page">
            <DefaultHeader title="Quests For ℛετα𝔯δˢ" backbutton/>
            {children}
        </div>
    )
}