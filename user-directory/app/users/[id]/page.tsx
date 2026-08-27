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
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              User Details
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Detailed information for {user.name}
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" className="shadow-sm">
              Back to list
            </Button>
          </Link>
        </div>

        <Card className="border bg-card/60 backdrop-blur shadow-md">
          <CardHeader className="border-b pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-semibold">
                  {user.name}
                </CardTitle>
                <div className="mt-1 text-sm text-muted-foreground">
                  @{user.username}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">ID: {user.id}</Badge>
                <Badge>Active</Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-5 pt-5 sm:grid-cols-2">
            <DetailBlock label="Email" value={user.email} />
            <DetailBlock label="Phone" value={user.phone} />

            <div className="sm:col-span-2">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Address
              </div>
              <div className="mt-1 text-sm">
                {user.address.street}, {user.address.city} – {user.address.zipcode}
              </div>
            </div>

            <DetailBlock label="Company" value={user.company.name} />
            <DetailBlock
              label="Website"
              value={user.website}
              asLink={`https://${user.website}`}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function DetailBlock({
  label,
  value,
  asLink,
}: {
  label: string;
  value: string;
  asLink?: string;
}) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      {asLink ? (
        <a
          href={asLink}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {value}
        </a>
      ) : (
        <div className="mt-1 text-sm">{value}</div>
      )}
    </div>
  );
}