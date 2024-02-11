import Navbar from '@/components/Navbar';
import Event from '@/components/Event';
import axios from 'axios';
import { TEvent } from '../types';

export default async function Home() {
  let eventData = await axios.get('https://api.hackthenorth.com/v3/events')
  let events: TEvent[] = eventData.data;

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <Navbar />
      {events.map((e: TEvent) => {
        return <Event event={e} events={events} />
      })}
    </main>
  );
}
