import { NextResponse } from 'next/server'
import { conversations } from '@/app/(dashboard)/(features)/chats/data/convo.json'

// TODO: replace with a real query once the conversations table lands.
// The sleep keeps local behaviour honest about the round trip we'll have.
const roundTrip = () =>
  new Promise((resolve) => setTimeout(resolve, 120 + Math.random() * 220))

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q') ?? ''

  await roundTrip()

  const needle = query.trim().toLowerCase()
  const results = needle
    ? conversations.filter(({ fullName }) =>
        fullName.toLowerCase().includes(needle)
      )
    : conversations

  return NextResponse.json({ results })
}
