import Link from "@/components/basic-items/Link";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--so-light-color)] ">
      <div
        className="bg-[var(--background-color)] p-8 rounded-lg shadow-lg text-center animate-fade-in 
      -mt-[10vh]"
      >
        <div className="text-3xl font-bold text-[var(--navy-blue)] mb-4">
          It may be developed later.
        </div>
        <div className="text-lg text-[var(--navy-blue)]">
          Currently, it is not supported yet.
        </div>
        <Link
          href="/"
          className="link mt-8 w-full"
          style={{ outline: "1px solid var(--primary-color)" }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
