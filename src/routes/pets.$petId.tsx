import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Heart,
  Home,
  Info,
  MapPin,
  PawPrint,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdoptionForm } from "@/components/pawconnect/adoption-form";
import { PetCard } from "@/components/pawconnect/pet-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/app-context";
import { useAuth } from "@/context/auth-context";
import { getPet, pets, type Pet } from "@/data/pets";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pets/$petId")({
  loader: ({ params }) => {
    const pet = getPet(params.petId);
    if (!pet) {
      throw notFound();
    }
    return { pet };
  },
  head: ({ loaderData }) => {
    const pet = loaderData?.pet;
    return {
      meta: [
        {
          title: pet
            ? `Meet ${pet.name} (${pet.breed}) — Adopt on PawConnect`
            : "Pet Details — PawConnect",
        },
        {
          name: "description",
          content: pet
            ? `${pet.name} is a ${pet.age} old ${pet.breed} looking for a loving home. ${pet.description}`
            : "Pet profile details on PawConnect.",
        },
        {
          property: "og:title",
          content: pet ? `Adopt ${pet.name} — PawConnect` : "Pet Details",
        },
        {
          property: "og:description",
          content: pet ? pet.description : "Pet profile on PawConnect",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PetDetailPage,
  notFoundComponent: PetNotFoundPage,
});

function PetDetailPage() {
  const { pet } = Route.useLoaderData();
  const { isFavorite, toggleFavorite } = useApp();
  const { user, openAuthModal } = useAuth();
  const [formOpen, setFormOpen] = useState(false);

  const saved = isFavorite(pet.id);

  const handleAdoptClick = () => {
    if (!user) {
      openAuthModal(
        `Please sign in or create an account to start your adoption application for ${pet.name}.`,
        () => setFormOpen(true),
      );
    } else {
      setFormOpen(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Profile link copied to clipboard! 📋");
    } else {
      toast.success("Sharing pet profile!");
    }
  };

  const similarPets = pets.filter((p) => p.id !== pet.id && p.species === pet.species).slice(0, 3);

  return (
    <main className="page-enter min-h-screen pb-20">
      {/* Breadcrumbs & Navigation */}
      <section className="border-b bg-secondary/60 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            to="/pets"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to all pets
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <Link to="/pets" className="hover:text-foreground">
              Pets
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{pet.name}</span>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Image & Bio */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Main Pet Image */}
            <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
              <img
                src={pet.image}
                alt={`${pet.name}, a ${pet.age} old ${pet.breed}`}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-surface-glass px-4 py-1.5 text-xs font-extrabold uppercase text-teal shadow-md backdrop-blur">
                {pet.status}
              </span>
              <Button
                variant="glass"
                size="icon"
                aria-label={
                  saved ? `Remove ${pet.name} from favorites` : `Save ${pet.name} to favorites`
                }
                onClick={() => toggleFavorite(pet.id, pet.name)}
                className="absolute right-4 top-4 rounded-full shadow-md"
              >
                <Heart className={cn("size-5", saved && "fill-current text-primary")} />
              </Button>
            </div>

            {/* Pet Title & Basic Specs */}
            <div className="mt-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
                    {pet.species} · {pet.breed}
                  </span>
                  <h1 className="mt-1 font-display text-4xl font-black text-foreground sm:text-5xl">
                    {pet.name}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                    <Share2 className="size-4" /> Share
                  </Button>
                  <Button
                    variant={saved ? "default" : "outline"}
                    size="sm"
                    className="gap-2"
                    onClick={() => toggleFavorite(pet.id, pet.name)}
                  >
                    <Heart className={cn("size-4", saved && "fill-current")} />
                    {saved ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>

              {/* Quick Stat Badges */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border bg-card p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Age</p>
                  <p className="mt-1 font-display text-lg font-bold text-foreground">
                    {pet.age} ({pet.ageCategory})
                  </p>
                </div>
                <div className="rounded-2xl border bg-card p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Gender</p>
                  <p className="mt-1 font-display text-lg font-bold text-foreground">
                    {pet.gender}
                  </p>
                </div>
                <div className="rounded-2xl border bg-card p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Size</p>
                  <p className="mt-1 font-display text-lg font-bold text-foreground">{pet.size}</p>
                </div>
                <div className="rounded-2xl border bg-card p-4 shadow-soft">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Location</p>
                  <p className="mt-1 flex items-center gap-1 font-display text-sm font-bold text-foreground">
                    <MapPin className="size-3.5 text-teal" /> {pet.location}
                  </p>
                </div>
              </div>

              {/* Personality Traits */}
              <div className="mt-8">
                <h3 className="font-display text-xl font-bold">Personality & Temperament</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pet.traits.map((trait) => (
                    <span
                      key={trait}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary/15 px-3.5 py-1.5 font-display text-sm font-bold text-primary"
                    >
                      <Sparkles className="size-3.5" />
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Story Description */}
              <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <h3 className="font-display text-2xl font-bold">About {pet.name}</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                  {pet.description}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {pet.name} is currently cared for by our foster collective at{" "}
                  <strong>{pet.rescue}</strong>. They have received behavioral monitoring, social
                  playtime with other animals, and daily enrichment to ensure they transition
                  smoothly into their new family.
                </p>
              </div>

              {/* Compatibility & Good With */}
              <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <h3 className="font-display text-2xl font-bold">Household Compatibility</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Behavioral observations from foster home evaluations:
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border p-4",
                      pet.goodWithChildren
                        ? "border-teal/30 bg-teal/5"
                        : "border-border bg-secondary/30",
                    )}
                  >
                    <div
                      className={cn(
                        "grid size-10 place-items-center rounded-xl",
                        pet.goodWithChildren
                          ? "bg-teal text-teal-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {pet.goodWithChildren ? (
                        <Check className="size-5" />
                      ) : (
                        <X className="size-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-display font-bold">Children</p>
                      <p className="text-xs text-muted-foreground">
                        {pet.goodWithChildren ? "Great with kids" : "Adult home preferred"}
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border p-4",
                      pet.goodWithDogs
                        ? "border-teal/30 bg-teal/5"
                        : "border-border bg-secondary/30",
                    )}
                  >
                    <div
                      className={cn(
                        "grid size-10 place-items-center rounded-xl",
                        pet.goodWithDogs
                          ? "bg-teal text-teal-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {pet.goodWithDogs ? <Check className="size-5" /> : <X className="size-5" />}
                    </div>
                    <div>
                      <p className="font-display font-bold">Other Dogs</p>
                      <p className="text-xs text-muted-foreground">
                        {pet.goodWithDogs ? "Dog-friendly" : "Prefers being only dog"}
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border p-4",
                      pet.goodWithCats
                        ? "border-teal/30 bg-teal/5"
                        : "border-border bg-secondary/30",
                    )}
                  >
                    <div
                      className={cn(
                        "grid size-10 place-items-center rounded-xl",
                        pet.goodWithCats
                          ? "bg-teal text-teal-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {pet.goodWithCats ? <Check className="size-5" /> : <X className="size-5" />}
                    </div>
                    <div>
                      <p className="font-display font-bold">Cats</p>
                      <p className="text-xs text-muted-foreground">
                        {pet.goodWithCats ? "Cat-friendly" : "Best without cats"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Veterinary & Medical Passport */}
              <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-teal/15 text-teal">
                    <Stethoscope className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">Veterinary Health Status</h3>
                    <p className="text-xs text-muted-foreground">
                      Full medical vetting completed by licensed veterinarians
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-2xl border bg-secondary/30 p-4">
                    <Syringe className="mt-0.5 size-5 shrink-0 text-teal" />
                    <div>
                      <p className="font-display font-bold">
                        Vaccinations: {pet.vaccinated ? "Up-to-Date" : "In Progress"}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Core immunizations (Rabies, DHPP/FVRCP) administered.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border bg-secondary/30 p-4">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-teal" />
                    <div>
                      <p className="font-display font-bold">
                        Sterilization:{" "}
                        {pet.sterilized ? "Spayed / Neutered" : "Age Pending / Voucher"}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {pet.sterilized
                          ? "Sterilized prior to adoption."
                          : "Spay/neuter surgery voucher provided."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border bg-secondary/30 p-4">
                    <PawPrint className="mt-0.5 size-5 shrink-0 text-teal" />
                    <div>
                      <p className="font-display font-bold">Microchipped & Registered</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Pre-implanted lifetime microchip with free contact registry.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border bg-secondary/30 p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal" />
                    <div>
                      <p className="font-display font-bold">Dewormed & Parasite Free</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Screened for parasites and treated with preventive meds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Adoption Card */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Adoption Action Card */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold uppercase text-teal">
                    Adoption Opportunity
                  </span>
                  <Badge variant={pet.status === "Available" ? "default" : "secondary"}>
                    {pet.status}
                  </Badge>
                </div>

                <div className="mt-4 border-b pb-6">
                  <h3 className="font-display text-3xl font-black">Adopt {pet.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fostered by {pet.rescue} in {pet.location}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Standard Adoption Fee:</span>
                    <span className="font-display font-bold text-foreground">₹2,000 – ₹5,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Medical Investment:</span>
                    <span className="font-bold text-teal">Included (₹15,000+ value)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Post-Adoption Support:</span>
                    <span className="font-bold text-foreground">30 Days 24/7</span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button
                    size="lg"
                    className="w-full text-base font-bold shadow-warm"
                    onClick={handleAdoptClick}
                  >
                    Apply to Adopt {pet.name}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => toggleFavorite(pet.id, pet.name)}
                  >
                    <Heart className={cn("size-4 mr-2", saved && "fill-current text-primary")} />
                    {saved ? "Saved in Favorites" : "Add to Favorites"}
                  </Button>
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Zero application fee · Demonstration project
                </p>
              </div>

              {/* Adoption Process Mini Checklist */}
              <div className="rounded-3xl border border-border bg-secondary/50 p-6 shadow-soft">
                <h4 className="font-display text-lg font-bold">Adoption Process</h4>
                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
                      1
                    </span>
                    <div>
                      <p className="font-bold text-foreground">Submit Application</p>
                      <p className="text-muted-foreground">Online form takes ~5 mins.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
                      2
                    </span>
                    <div>
                      <p className="font-bold text-foreground">Meet & Greet Visit</p>
                      <p className="text-muted-foreground">
                        Spend relaxed 1-on-1 time with {pet.name}.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
                      3
                    </span>
                    <div>
                      <p className="font-bold text-foreground">Welcome Home</p>
                      <p className="text-muted-foreground">
                        Receive medical passport and ongoing care support.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-border/80 pt-4 text-center">
                  <Link to="/how-it-works" className="text-xs font-bold text-teal hover:underline">
                    Read full adoption guide →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Pets Section */}
        {similarPets.length > 0 && (
          <section className="mt-20 border-t pt-16">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
                  More Companions
                </span>
                <h2 className="mt-1 font-display text-3xl font-black sm:text-4xl">
                  Other {pet.species}s Looking for a Home
                </h2>
              </div>
              <Button asChild variant="outline">
                <Link to="/pets" search={{ species: pet.species }}>
                  View All {pet.species}s
                </Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarPets.map((p) => (
                <PetCard key={p.id} pet={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Adoption Form Dialog */}
      <AdoptionForm open={formOpen} onOpenChange={setFormOpen} petName={pet.name} petId={pet.id} />
    </main>
  );
}

function PetNotFoundPage() {
  return (
    <main className="page-enter mx-auto grid min-h-[70vh] max-w-xl place-items-center px-5 py-20 text-center">
      <div>
        <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-primary/15 text-primary">
          <PawPrint className="size-10" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-black">This Trail Went Cold</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn’t find this pet profile. They may have already found their forever home or the
          link is incorrect.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link to="/pets">Browse Available Pets</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
