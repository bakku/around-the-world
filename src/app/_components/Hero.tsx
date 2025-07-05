import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col gap-6 py-14 px-4">
      <h1 className="text-4xl xl:text-5xl tracking-tighter font-semibold text-center">
        Improve your Darts Skills
      </h1>

      <p className="text-center text-lg mx-auto max-w-2xl">
        Play the dart game &#34;Around the World&#34;, track your progress over
        time and see how you improve. Start playing today for{" "}
        <span className="underline underline-offset-4">free</span> and{" "}
        <span className="underline underline-offset-4">without signing up</span>
        .
      </p>

      <div className="flex justify-center">
        <Button asChild size="lg" className="flex-1 md:flex-none">
          <Link href="/rooms/new">Start Playing</Link>
        </Button>
      </div>
    </div>
  );
}
