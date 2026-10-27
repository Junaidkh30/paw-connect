import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bird,
  Cat,
  Dog,
  HeartHandshake,
  Home,
  MapPin,
  PawPrint,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import pet1Buddy from "@/assets/pet-1-buddy.jpg";
import { PetCard } from "@/components/pawconnect/pet-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryImages, pets, successStories } from "@/data/pets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PawConnect — Every Pet Deserves a Loving Home" },
      {
        name: "description",
        content:
          "Meet fictional rescue pets and explore a polished demo adoption journey with PawConnect.",
      },
      { property: "og:title", content: "PawConnect — Every Pet Deserves a Loving Home" },
      {
        property: "og:description",
        content: "Find your perfect companion in this frontend-only pet adoption demo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
function HomePage() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const search = () => nav({ to: "/pets", search: { q, species, location } });
  return (
    <main className="page-enter overflow-hidden">
      <section className="relative min-h-[calc(100vh-4.5rem)] bg-secondary">
        <img
          src={pet1Buddy}
          alt="Happy golden retriever waiting for a family"
          width={1408}
          height={1056}
          className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/10" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl items-center px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-glass px-4 py-2 text-xs font-extrabold uppercase text-teal shadow-sm">
              <PawPrint className="size-4" />
              Where second chances begin
            </span>
            <h1 className="mt-6 font-display text-5xl font-black leading-[1.02] sm:text-7xl lg:text-8xl">
              Every Pet Deserves a <span className="text-primary">Loving Home.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Find your perfect companion and give a rescue animal a second chance at happiness.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/pets">
                  Find Your Companion
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass">
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-6 right-5 hidden rounded-2xl border border-surface-glass-border bg-surface-glass p-4 shadow-lift backdrop-blur md:block">
            <p className="text-2xl font-black text-teal">2,500+</p>
            <p className="text-sm font-semibold">pets waiting for a home</p>
            <span className="text-[10px] font-bold uppercase text-muted-foreground">
              Sample statistic
            </span>
          </div>
        </div>
      </section>
      <section className="relative z-10 mx-auto -mt-6 max-w-6xl px-5">
        <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-lift md:grid-cols-[1fr_.8fr_1fr_auto]">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by pet name"
          />
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="h-11 rounded-xl border bg-background px-3 text-sm"
          >
            <option value="">Any pet type</option>
            {["Dog", "Cat", "Rabbit", "Bird", "Other"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or location"
          />
          <Button onClick={search}>
            <Search />
            Search
          </Button>
        </div>
      </section>
      <Section
        eyebrow="Meet the family"
        title="Pets hoping to meet you"
        copy="Every profile below is fictional demo content, created to show how PawConnect could feel."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pets
            .filter((p) => p.featured)
            .slice(0, 8)
            .map((p) => (
              <PetCard key={p.id} pet={p} />
            ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link to="/pets">
              Browse all pets
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase text-teal">Find your kind of friend</p>
            <h2 className="mt-2 font-display text-4xl font-black sm:text-5xl">
              Love comes in every shape.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Dog", icon: Dog },
              { name: "Cat", icon: Cat },
              { name: "Rabbit", icon: Sparkles },
              { name: "Bird", icon: Bird },
            ].map(({ name, icon: Icon }) => (
              <Link
                key={name}
                to="/pets"
                search={{ species: name }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <img
                  src={categoryImages[name]}
                  loading="lazy"
                  width={1408}
                  height={1056}
                  alt={`${name}s available`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-ink-foreground">
                  <div>
                    <Icon className="mb-2" />
                    <h3 className="font-display text-2xl font-black">{name}s</h3>
                    <p className="text-xs">
                      {pets.filter((p) => p.species === name).length} demo profiles
                    </p>
                  </div>
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Section eyebrow="A thoughtful journey" title="From hello to home">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Search,
              title: "Discover Your Companion",
              copy: "Browse pets looking for a loving family.",
            },
            {
              icon: HeartHandshake,
              title: "Submit an Application",
              copy: "Tell us a little about yourself and your home.",
            },
            {
              icon: Home,
              title: "Meet Your New Best Friend",
              copy: "Connect with the organization and begin your journey.",
            },
          ].map(({ icon: Icon, title, copy }, i) => (
            <div key={title} className="border-t-2 border-primary pt-6">
              <span className="font-display text-sm font-black text-primary">0{i + 1}</span>
              <Icon className="mt-5 size-8 text-teal" />
              <h3 className="mt-4 font-display text-2xl font-bold">{title}</h3>
              <p className="mt-2 leading-7 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </Section>
      <section className="bg-teal py-16 text-teal-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["2,500+", "Pets Rescued"],
            ["1,800+", "Successful Adoptions"],
            ["150+", "Partner Organizations"],
            ["95%", "Happy Families"],
          ].map((x) => (
            <div key={x[1]}>
              <p className="font-display text-5xl font-black">{x[0]}</p>
              <p className="mt-1 font-semibold">{x[1]}</p>
              <p className="mt-1 text-[10px] font-bold uppercase opacity-70">Sample data</p>
            </div>
          ))}
        </div>
      </section>
      <Section eyebrow="Happy endings" title="Stories that started with a click">
        <div className="grid gap-6 md:grid-cols-3">
          {successStories.map((s) => (
            <article key={s.id} className="overflow-hidden rounded-2xl bg-card shadow-soft">
              <img
                src={s.image}
                alt={s.pet}
                loading="lazy"
                width={1408}
                height={1056}
                className="aspect-[5/3] w-full object-cover"
              />
              <div className="p-6">
                <p className="text-sm font-bold text-teal">
                  {s.pet} + {s.adopter}
                </p>
                <blockquote className="mt-3 font-display text-xl font-bold leading-7">
                  “{s.quote}”
                </blockquote>
                <p className="mt-3 text-xs text-muted-foreground">Fictional demo story</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link to="/success-stories">Read More Stories</Link>
          </Button>
        </div>
      </Section>
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-ink px-6 py-16 text-center text-ink-foreground sm:px-12">
          <ShieldCheck className="mx-auto size-10 text-primary" />
          <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl">
            Your New Best Friend Is Waiting.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            One small act of kindness can change a life forever.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/pets">Start Your Adoption Journey</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
function Section({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-extrabold uppercase text-teal">{eyebrow}</p>
          <h2 className="mt-2 font-display text-4xl font-black sm:text-5xl">{title}</h2>
          {copy && <p className="mt-4 leading-7 text-muted-foreground">{copy}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
