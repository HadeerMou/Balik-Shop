import type { Metadata } from "next";
import { Account } from "@/components/account/Account";

export const metadata: Metadata = {
  title: "Your account",
  description:
    "Your Balık Shop preferences — delivery region, the bag you left behind, and order help.",
};

export default function AccountPage() {
  return <Account />;
}
