import BotContainer from './BotContainer'

export const metadata = {
  title: 'BotPage | Inova'
}

// const botId = '668fadec9577e0dfdeaf9430'
const threadId = '669793c91ee718c7a3635049'

export default function BotPage() {
  return <BotContainer threadId={threadId} />
}
