import { OnlinePokerSessionProvider } from "./onlinePokerSessionContext"

export default function OnlinePokerLayout ({ children }: { children: React.ReactNode }) {
    return <>
        <OnlinePokerSessionProvider>
            {children}
        </OnlinePokerSessionProvider>
    </>
}
