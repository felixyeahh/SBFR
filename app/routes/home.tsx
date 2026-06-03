import type { Route } from "./+types/home";
import { Main } from "../main/main";
import { useState } from "react";
import { onSubmitContext } from "~/main/onSubmitHandler";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SBFR | Baffu" },
    { name: "description", content: "Welcome to ʂ𝓅Ｏ𝔯τ𝔰 𝔅εττ𝔦𝔫𝔤 𝔉𝔬𝔯 ℛετα𝔯𝕕ˢ" },
    { name: "viewport", content: "width=device-width, initial-scale=1"},
  ];
}

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <onSubmitContext.Provider value={{isOpen, setIsOpen}}>
      <Main />
    </onSubmitContext.Provider>
  );
}
