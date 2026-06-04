import DefaultHeader from "../tools/DefaultHeader"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <DefaultHeader backbutton />
            {children}
        </div>
    )
}