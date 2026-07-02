import DefaultHeader from "../components/DefaultHeader";
import "./dashboard.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <DefaultHeader backbutton />
            {children}
        </div>
    )
}