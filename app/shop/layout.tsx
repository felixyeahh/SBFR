import DefaultHeader from "../components/DefaultHeader";

export default function ShopLayout({ children }: { children: React.ReactNode }){
    return (
        <div>
            <DefaultHeader backbutton />
            {children}
        </div>
    )
}