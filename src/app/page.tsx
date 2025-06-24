import { ChartNoAxesCombined, KeySquare, Scale } from "lucide-react";
import { twMerge } from "tailwind-merge";
import BookmarkExample from "@/app/_components/BookmarkExample";
import ExampleChart from "@/app/_components/ExampleChart";
import HowToAnimation from "@/app/_components/HowToAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Hero from "./_components/Hero";

export const metadata = {
  title: "Start | Around the World",
};

function Separator({ className }: { className?: string }) {
  return (
    <hr
      className={twMerge(className, "w-screen ml-[calc(-50vw+50%)] border-t")}
    />
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <Separator />

      <div className="w-full flex flex-col lg:flex-row px-4 py-14 gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex flex-row gap-2 items-center font-normal">
              <Scale /> <h2>How to play</h2>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            <div className="text-xl font-semibold">
              Start at number 1 and get up to 20 as fast as possible.{" "}
              <span className="text-muted-foreground">
                Hit each number once to proceed to the next number.
              </span>
            </div>

            <div className="p-8 flex-1">
              <HowToAnimation />
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex flex-row gap-2 items-center font-normal">
              <ChartNoAxesCombined /> <h2>Track your progress</h2>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-xl font-semibold">
              Analyse your throwing. Visualise your progress.{" "}
              <span className="text-muted-foreground">
                Each throw is recorded and can be tracked through a set of
                helpful charts.
              </span>
            </div>

            <div className="p-8">
              <ExampleChart />
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex flex-row gap-2 items-center font-normal">
              <KeySquare /> <h2>No login necessary</h2>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            <div className="text-xl font-semibold">
              No need for email and password.{" "}
              <span className="text-muted-foreground">
                You&#39;ll get a unique link which you can bookmark.
              </span>
            </div>

            <div className="p-8 flex-1">
              <BookmarkExample />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
