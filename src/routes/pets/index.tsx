import { createFileRoute } from "@tanstack/react-router";
import { Check, Grid2X2, List, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PetCard } from "@/components/pawconnect/pet-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { filterAndSortPets, pets } from "@/data/pets";
import { cn } from "@/lib/utils";

type SearchParams = {
  q?: string | undefined;
  species?: string | undefined;
  location?: string | undefined;
};

export const Route = createFileRoute("/pets/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => {
    const q = typeof s["q"] === "string" ? s["q"] : undefined;
    const species = typeof s["species"] === "string" ? s["species"] : undefined;
    const location = typeof s["location"] === "string" ? s["location"] : undefined;
    return { q, species, location };
  },
  head: () => ({
    meta: [
      { title: "Find a Pet — PawConnect" },
      {
        name: "description",
        content: "Explore 16 fictional rescue pet profiles with local search and filters.",
      },
      { property: "og:title", content: "Find Your New Best Friend — PawConnect" },
      {
        property: "og:description",
        content: "Search and filter fictional rescue pets in this frontend-only demo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PetsPage,
});

function PetsPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [species, setSpecies] = useState(search.species ?? "");
  const [location, setLocation] = useState(search.location ?? "");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [breed, setBreed] = useState("");
  const [good, setGood] = useState<string[]>([]);
  const [sort, setSort] = useState("recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [q, species, location, age, gender, size, breed, good, sort]);

  const filtered = useMemo(
    () =>
      filterAndSortPets(pets, {
        q,
        species,
        location,
        age,
        gender,
        size,
        breed,
        good,
        sort,
      }),
    [q, species, location, age, gender, size, breed, good, sort],
  );

  const clear = () => {
    setQ("");
    setSpecies("");
    setLocation("");
    setAge("");
    setGender("");
    setSize("");
    setBreed("");
    setGood([]);
  };

  const toggleGood = (x: string) =>
    setGood((v) => (v.includes(x) ? v.filter((i) => i !== x) : [...v, x]));

  const Filters = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">Filter pets</h2>
        <Button variant="ghost" size="sm" onClick={clear}>
          Clear
        </Button>
      </div>
      <Field label="Pet name or breed">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try Luna or Beagle" />
      </Field>
      <Field label="Species">
        <Select
          value={species}
          set={setSpecies}
          options={["Dog", "Cat", "Rabbit", "Bird", "Other"]}
        />
      </Field>
      <Field label="Breed">
        <Input value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Any breed" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Age">
          <Select value={age} set={setAge} options={["Baby", "Young", "Adult", "Senior"]} />
        </Field>
        <Field label="Gender">
          <Select value={gender} set={setGender} options={["Male", "Female"]} />
        </Field>
      </div>
      <Field label="Size">
        <Select value={size} set={setSize} options={["Small", "Medium", "Large"]} />
      </Field>
      <Field label="Location">
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Any city"
        />
      </Field>
      <div>
        <p className="mb-3 text-sm font-bold">Good with</p>
        {[
          { key: "children", label: "Children" },
          { key: "dogs", label: "Dogs" },
          { key: "cats", label: "Cats" },
        ].map(({ key, label }) => (
          <label key={key} className="mb-2 flex items-center gap-2 text-sm">
            <Checkbox checked={good.includes(key)} onCheckedChange={() => toggleGood(key)} />
            {label}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <main className="page-enter min-h-screen">
      <section className="border-b bg-secondary">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <span className="text-sm font-extrabold uppercase text-teal">Meet your match</span>
          <h1 className="mt-2 font-display text-5xl font-black sm:text-6xl">
            Find Your New Best Friend.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Explore fictional profiles and discover the kind of companion who could fit your life.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
            <Input
              className="pl-10"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pets"
            />
          </div>
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setMobileFilters((v) => !v)}
          >
            <SlidersHorizontal />
            Filters
          </Button>
        </div>
        {mobileFilters && (
          <div className="mb-6 rounded-2xl border bg-card p-5 lg:hidden">
            <Filters />
          </div>
        )}
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden rounded-2xl border bg-card p-5 lg:block">
            <Filters />
          </aside>
          <section>
            <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <p className="font-display text-xl font-bold">{filtered.length} pets found</p>
                <p className="text-xs text-muted-foreground">
                  All profiles are fictional demo content.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <select
                  aria-label="Sort pets"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="hidden h-10 rounded-xl border bg-background px-3 text-sm sm:block"
                >
                  <option value="recommended">Recommended</option>
                  <option value="newest">Newest arrivals</option>
                  <option value="name">Name A–Z</option>
                  <option value="age">Age</option>
                </select>
                <div className="flex rounded-xl border p-1">
                  <Button
                    size="icon"
                    variant={view === "grid" ? "secondary" : "ghost"}
                    onClick={() => setView("grid")}
                    aria-label="Grid view"
                  >
                    <Grid2X2 />
                  </Button>
                  <Button
                    size="icon"
                    variant={view === "list" ? "secondary" : "ghost"}
                    onClick={() => setView("list")}
                    aria-label="List view"
                  >
                    <List />
                  </Button>
                </div>
              </div>
            </div>
            {loading ? (
              <div className={cn("grid gap-6", view === "grid" && "sm:grid-cols-2 xl:grid-cols-3")}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[4/3] rounded-2xl" />
                    <Skeleton className="h-7 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : filtered.length ? (
              <>
                <div
                  className={cn("grid gap-6", view === "grid" && "sm:grid-cols-2 xl:grid-cols-3")}
                >
                  {filtered.slice(0, limit).map((p) => (
                    <PetCard key={p.id} pet={p} view={view} />
                  ))}
                </div>
                {limit < filtered.length && (
                  <div className="mt-10 text-center">
                    <Button variant="outline" onClick={() => setLimit((v) => v + 6)}>
                      Load more pets
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed py-20 text-center">
                <X className="mx-auto size-10 text-primary" />
                <h2 className="mt-4 font-display text-2xl font-bold">No paws found here</h2>
                <p className="mt-2 text-muted-foreground">
                  Try loosening a filter to meet more pets.
                </p>
                <Button className="mt-5" onClick={clear}>
                  Clear filters
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <div className="mt-2 font-normal">{children}</div>
    </label>
  );
}

function Select({
  value,
  set,
  options,
}: {
  value: string;
  set: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => set(e.target.value)}
      className="h-11 w-full rounded-xl border bg-background px-3 text-sm"
    >
      <option value="">Any</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
