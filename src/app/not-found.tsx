import Link from "next/link";
import CreateRoomButton from "@/app/_components/CreateRoomButton";
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
      <Card className="lg:min-w-[30%] min-w-[80%]">
        <CardHeader>
          <CardTitle className="text-xl">Page not found</CardTitle>
          <CardDescription className="text-md">
            The page you were looking for does not exist. But why don&#39;t you
            go and play some darts?
          </CardDescription>
        </CardHeader>

        <CardFooter className="gap-2">
          <Button size="lg" variant="outline" className="flex-1" asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <CreateRoomButton className="flex-1" />
        </CardFooter>
      </Card>
    </div>
  );
}
