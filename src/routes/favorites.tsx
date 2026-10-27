import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Search, User as UserIcon } from "lucide-react";
import { PetCard } from "@/components/pawconnect/pet-card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app-context";
import { useAuth } from "@/context/auth-context";
import { pets } from "@/data/pets";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Your Favorites — PawConnect" },
      {
        name: "description",
        content: "Review pet profiles saved to your PawConnect account.",
      },
      { property: "og:title", content: "Your Favorites — PawConnect" },
      {
        property: "og:description",
        content: "Your saved PawConnect companion animals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { favorites, hydrated } = useApp();
  const { user, openAuthModal } = useAuth();
  const saved = pets.filter((p) => favorites.includes(p.id));

  return (
    <main className="page-enter mx-auto min-h-[70vh] max-w-7xl px-5 py-16 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold uppercase text-teal">
            {user ? "Saved to your account" : "Favorites List"}
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-black">Your Favorites</h1>
          <p className="mt-2 text-muted-foreground">
            A shortlist of rescue companion animals who caught your heart.
          </p>
        </div>

        {!user && (
          <Button
            variant="outline"
            onClick={() =>
              openAuthModal("Sign in to sync and save your favorite pets across devices.")
            }
            className="gap-2 font-bold"
          >
            <UserIcon className="size-4" /> Sign In to Sync Favorites
          </Button>
        )}
      </div>

      {hydrated && saved.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map((p) => (
            <PetCard key={p.id} pet={p} />
          ))}
        </div>
      ) : hydrated ? (
        <div className="mt-12 rounded-3xl border border-dashed bg-secondary/50 px-5 py-20 text-center">
          <Heart className="mx-auto size-12 text-primary" />
          <h2 className="mt-5 font-display text-3xl font-bold">No favorites yet</h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Tap the heart icon on any pet to save them to your account.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/pets">
                <Search className="mr-2 size-4" /> Find a pet
              </Link>
            </Button>
            {!user && (
              <Button
                variant="outline"
                onClick={() => openAuthModal("Sign in to save and manage your favorite pets.")}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
