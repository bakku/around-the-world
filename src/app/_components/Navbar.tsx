import { Target } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="xl:container mx-auto px-4 h-16 flex justify-start items-center">
        <Link href="/" className="flex items-center gap-3">
          <Target className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Around the World</span>
        </Link>
      </div>
    </header>
  );
}
