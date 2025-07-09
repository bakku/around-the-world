import RecentRooms from "@/app/rooms/recent/_components/RecentRooms";

export const metadata = {
  title: "Recent Rooms",
};

export default function Page() {
  return (
    <div className="px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Your recent rooms
        </h1>

        <p className="text-muted-foreground mb-6">
          It seems like you were recently playing the following rooms
        </p>
      </div>

      <RecentRooms />
    </div>
  );
}
