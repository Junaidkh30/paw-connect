import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app-context";
import type { Pet } from "@/data/pets";
import { cn } from "@/lib/utils";

export function PetCard({ pet, view = "grid" }: { pet: Pet; view?: "grid" | "list" }) {
  const { isFavorite, toggleFavorite } = useApp();
  const saved = isFavorite(pet.id);
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[1.25rem] border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift",
        view === "list" && "sm:grid sm:grid-cols-[220px_1fr]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          view === "grid" ? "aspect-[4/3]" : "aspect-[4/3] sm:aspect-auto sm:min-h-52",
        )}
      >
        <img
          src={pet.image}
          alt={`${pet.name}, a ${pet.breed}`}
          loading="lazy"
          width={1408}
          height={1056}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-surface-glass px-3 py-1 text-xs font-bold text-teal shadow-sm">
          {pet.status}
        </span>
        <Button
          aria-label={saved ? `Remove ${pet.name} from favorites` : `Save ${pet.name} to favorites`}
          onClick={() => toggleFavorite(pet.id, pet.name)}
          variant="glass"
          size="icon"
          className="absolute right-3 top-3 rounded-full"
        >
          <Heart className={cn(saved && "fill-current text-primary")} />
        </Button>
      </div>
      <div className="p-5">
        <div className="mb-1 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">{pet.name}</h3>
            <p className="text-sm font-medium text-muted-foreground">
              {pet.breed} · {pet.age}
            </p>
          </div>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
            {pet.gender}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {pet.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <MapPin className="size-3.5 text-teal" />
          {pet.location}
        </div>
        <Button asChild className="mt-5 w-full" variant="soft">
          <Link to="/pets/$petId" params={{ petId: String(pet.id) }}>
            Meet {pet.name}
          </Link>
        </Button>
      </div>
    </article>
  );
}
