import Practice from "@/src/components/Practice";

export default function Home() {
  return (
        <div className="flex flex-column align-items-center">
          <h1>
            Hi!  Welcome to PractiseGrammar, a tool that, you guessed it, helps you practice grammar.
          </h1>
          <Practice />
        </div>
  )
}
