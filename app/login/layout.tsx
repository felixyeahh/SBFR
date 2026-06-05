import DefaultHeader from "../components/DefaultHeader";
import LoginMenu from "./login";
import "../styles/loginPage.css";

export default function LoginLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="login-page">
            <DefaultHeader/>
            {children}
        </div>
    );
}