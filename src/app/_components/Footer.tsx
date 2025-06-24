import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="xl:container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm text-muted-foreground">
          Made by{" "}
          <a
            href="https://railsmatic.com"
            className="underline underline-offset-4"
          >
            bakku
          </a>{" "}
          and{" "}
          <a
            href="https://cursor.com/"
            className="underline underline-offset-4"
          >
            cursor
          </a>{" "}
          in Upper Palatine.
        </p>
        <div className="flex gap-4">
          <Link
            href="/imprint"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Imprint
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
