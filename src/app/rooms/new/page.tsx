import CreateRoomForm from "./_components/CreateRoomForm";

export const metadata = {
  title: "Create New Room",
};

export default function Page() {
  return (
    <div className="flex-1 flex justify-center items-center px-4">
      <CreateRoomForm />
    </div>
  );
}
