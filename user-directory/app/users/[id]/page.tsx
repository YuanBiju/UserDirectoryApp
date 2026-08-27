import { notFound } from "next/navigation";
import { getUserById } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);

  let user;
  try {
    user = await getUserById(userId);
  } catch {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Details</h1>
        <Link href="/">
          <Button variant="outline">Back to list</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <div className="text-sm text-muted-foreground">@{user.username}</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm font-medium">Email</div>
            <div className="text-sm">{user.email}</div>
          </div>

          <div>
            <div className="text-sm font-medium">Phone</div>
            <div className="text-sm">{user.phone}</div>
          </div>

          <div>
            <div className="text-sm font-medium">Address</div>
            <div className="text-sm">
              {user.address.street}, {user.address.city} – {user.address.zipcode}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">Company</div>
            <div className="text-sm">{user.company.name}</div>
          </div>

          <div>
            <div className="text-sm font-medium">Website</div>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-primary underline"
            >
              {user.website}
            </a>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary">ID: {user.id}</Badge>
            <Badge>Active</Badge>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}