import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="h-full grow flex items-center justify-center px-4">
      <Card className="xl:min-w-[30%] lg:min-w-[50%] min-w-[80%]">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
          <CardDescription>
            The page you were looking for does not exist. But why don&#39;t you
            go and play some darts?
          </CardDescription>
        </CardHeader>

        <CardFooter className="gap-2">
          <Button size="lg" variant="outline" className="flex-1" asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button size="lg" className="flex-1" asChild>
            <Link href="/rooms/new">Start Playing</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
