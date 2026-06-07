import "./checkbox.css";
import DefaultHeader from "../components/DefaultHeader";

export default function HomeLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <DefaultHeader signout/>
            {children}
        </div>
    )
}
