import type { Route } from "./+types/login";
import { Login } from "../LoginPage/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login for People (Maybe)" },
    { name: "description", content: "Welcome to ʂ𝓅Ｏ𝔯τ𝔰 𝔅εττ𝔦𝔫𝔤 𝔉𝔬𝔯 ℛετα𝔯𝕕ˢ" },
    { name: "viewport", content: "width=device-width, initial-scale=1"},
  ];
}

export default function LoginPage() {
  return <Login />;
}
