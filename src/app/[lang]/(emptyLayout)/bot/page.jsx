import BotContainer from './BotContainer'

export const metadata = {
  title: 'BotPage | Inova'
}

// const threadId = '668fadec9577e0dfdeaf9430'
const threadId = '66ba01c42d3e851899ba3767'

export default function BotPage() {
  return <BotContainer threadId={threadId} />
}
