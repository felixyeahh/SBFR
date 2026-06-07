import { StandardPokerProvider } from "./standardPokerContext"

export default function StandardPokerLayout ({children}: {children: React.ReactNode}) {
    return <StandardPokerProvider>
        {children}
    </StandardPokerProvider>
}