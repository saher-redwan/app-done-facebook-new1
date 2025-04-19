import Button from "@/components/basic-items/Button";
import Link from "@/components/basic-items/Link";

export default function page() {
  return (
    <div className="flex items-center justify-center h-[var(--screen-without-navbar)] bg-[var(--background-color-2)]">
      <div
        className="bg-[var(--so-light-color)] p-8 rounded-lg shadow-lg text-center animate-fade-in 
      -mt-[10vh]"
      >
        <div className="text-3xl font-bold  mb-4">Denied</div>
        <div className="text-lg ">Just for Admin</div>
        <Link href="/" className="mt-6">
          <Button>back home</Button>
        </Link>
      </div>
    </div>
  );
}
