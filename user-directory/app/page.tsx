import Link from "next/link";
import { getUsers } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

async function UsersList() {
  const users = await getUsers();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Link key={user.id} href={`/users/${user.id}`}>
          <Card className="group h-full border bg-card/60 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-1 text-lg font-semibold tracking-tight">
                {user.name}
              </CardTitle>
              <div className="text-xs text-muted-foreground">
                @{user.username}
              </div>
            </CardHeader>
            <CardContent className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="line-clamp-1 font-medium">{user.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">City</span>
                <span className="font-medium">{user.address.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Company</span>
                <span className="line-clamp-1 font-medium">
                  {user.company.name}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function UsersSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border bg-card/40">
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-1 h-4 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            User Directory
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse and explore sample users from a public API.
          </p>
        </div>

        <Suspense fallback={<UsersSkeleton />}>
          <UsersList />
        </Suspense>
      </div>
    </main>
  );
}