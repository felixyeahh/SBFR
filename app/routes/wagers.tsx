import type { Route } from "./+types/wagers";
import { Wagers } from "~/wagers/wagers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SBFR | Baffu" },
    { name: "description", content: "Welcome to ʂ𝓅Ｏ𝔯τ𝔰 𝔅εττ𝔦𝔫𝔤 𝔉𝔬𝔯 ℛετα𝔯𝕕ˢ" },
    { name: "viewport", content: "width=device-width, initial-scale=1"},
  ];
}

export default function WagersPage() {
  return <Wagers />;
}
