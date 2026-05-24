import DefaultHeader from "~/components/defaultheader"
import { useUser } from "~/components/userContext";

export function Admin() {
    const { user, loading, balance} = useUser();
    
    return (
        <div>
            <DefaultHeader user={user} loading={loading} balance={balance} title="Admin Panel 𝔉𝔬𝔯 ℛετα𝔯δˢ" backbutton/>

            
            
        </div>
    )
}
