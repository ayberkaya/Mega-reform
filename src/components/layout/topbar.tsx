"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-lavender/10 bg-white flex items-center justify-between px-4 md:px-6">
      <div>
        <h2 className="font-heading text-lg font-semibold text-primary">
          {getGreeting()}, {session?.user?.name?.split(" ")[0] || "Yolcu"}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <Avatar
          alt={session?.user?.name || "Kullanıcı"}
          src={session?.user?.image}
          size="sm"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-foreground/50 hover:text-foreground"
        >
          Çıkış
        </Button>
      </div>
    </header>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return "Iyi geceler";
  if (hour < 12) return "Gunaydın";
  if (hour < 18) return "Iyi gunler";
  return "Iyi aksamlar";
}
