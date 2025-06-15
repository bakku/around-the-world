import RecentGames from "@/components/RecentGames";
import StartGame from "@/components/StartGame";

export default function Home() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8 flex flex-col gap-8">
      {/*{errors && (*/}
      {/*  <Alert variant="destructive">*/}
      {/*    <AlertTitle>An error occurred</AlertTitle>*/}
      {/*    <AlertDescription>Your game could not be created. Please try again later</AlertDescription>*/}
      {/*  </Alert>*/}
      {/*)}*/}

      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-center mb-2">
          Around the World
        </h1>
        <p className="text-muted-foreground text-center">
          Track your progress in the dart game &#34;Around the World&#34;
        </p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-8">
        <div className="bg-muted rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
          <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
            <li>Start at number 1 and work your way up to 20</li>
            <li>Hit each number once to proceed to the next number</li>
            <li>The goal is to complete the game as quickly as possible</li>
            <li>Track your progress and high scores using the unique link</li>
          </ul>
        </div>

        <StartGame />
      </div>

      <RecentGames />
    </main>
  );
}
