import "./wagers.css";
import DefaultHeader from "../components/DefaultHeader";

export default function WagerLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="page-wagers">
            <DefaultHeader title="Wagers For ℛετα𝔯δˢ" backbutton/>
                
            {children}
        </div>
    )
}