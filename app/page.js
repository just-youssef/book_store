import Image from 'next/image'
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import SearchFeed from '@components/SearchFeed';

export default function Home() {
  return (
    <main className="coulmn-container">
      <SearchFeed />
    </main>
  )
}
