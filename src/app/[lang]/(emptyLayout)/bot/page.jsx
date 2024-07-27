import BotContainer from './BotContainer'

export const metadata = {
  title: 'BotPage | Inova'
}

// const botId = '668fadec9577e0dfdeaf9430'
const threadId = '66a4c43398f8967482e2b197'

export default function BotPage() {
  return <BotContainer threadId={threadId} />
}
