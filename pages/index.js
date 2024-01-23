import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container min-w-full bg-black">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/gengar-icon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="font-bold h-screen mt-10 description text-white">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
