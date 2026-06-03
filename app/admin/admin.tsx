import DefaultHeader from "~/tools/DefaultHeader"
import { useUser } from "~/tools/userContext";

export function Admin() {
    const { user, loading, balance} = useUser();
    
    return (
        <div>
            <DefaultHeader title="Admin Panel 𝔉𝔬𝔯 ℛετα𝔯δˢ" backbutton/>
        </div>
    )
}
