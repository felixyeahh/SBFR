import type { Route } from "./+types/home";
import { Main } from "../main/main";
import { useState } from "react";
import { onSubmitContext } from "~/main/onSubmitHandler";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SBFR | Baffu" },
    { name: "description", content: "Welcome to Sports Betting For Retards!" },
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
