import Link from "next/link";
import { Fish } from "@/components/Fish";

export default function NotFound() {
  return (
    <div className="section py-24 text-center">
      <Fish className="mx-auto w-32 animate-swim" />
      <h1 className="mt-6 font-display text-5xl font-bold text-navy-700">404</h1>
      <p className="mt-2 text-lg text-navy-500">
        This one got away. The page you&apos;re after isn&apos;t in our waters.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/shop" className="btn-ghost">Shop everything</Link>
      </div>
    </div>
  );
}
