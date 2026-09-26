import { ChatsClient } from './chats-client'
import { conversations } from './data/convo.json'

export default function ChatsPage() {
  return (
    <>
      <ChatsClient initialConversations={conversations} />
    </>
  )
}
