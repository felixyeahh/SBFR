import { useUser } from "../tools/userContext";
import DefaultHeader from "../tools/DefaultHeader";

export default function Shop() {
    const { user, balance, loading } = useUser();

    return (
        <div>
            <DefaultHeader title="Shop 𝔉𝔬𝔯 ℛετα𝔯δˢ" backbutton/>

            <div style={{ display: (user == null) ? "none" : "grid" }}>
                <div className="shop-section">
                    <div className="shop-offer">
                        <p className="shop-offer-title">Who?</p>
                        <p className="shop-offer-description">Makes Ashot the richest person alive</p>
                        <p className="shop-offer-price">$100</p>
                        <button className="shop-offer-button">Buy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
