import CreateRoomButton from "./_components/CreateRoomButton";
import RecentRooms from "./_components/RecentRooms";

export const metadata = {
  title: "Start | Around the World",
};

export default function Home() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8 flex flex-col gap-8">
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
            <li>Track your progress and high scores</li>
          </ul>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Create a new room</h2>
          <p className="text-muted-foreground mb-4">
            No account needed! Just click below to create a new room. You&#39;ll
            get a unique link to bookmark so you can return to view and improve
            your scores anytime.
          </p>

          <CreateRoomButton />
        </div>
      </div>

      <RecentRooms />
    </main>
  );
}
