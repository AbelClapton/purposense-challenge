import { TheoryOfChange } from './components'

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 text-gray-800">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center gap-6 bg-white px-4 py-12 sm:items-start">
        <TheoryOfChange />
      </main>
    </div>
  )
}
