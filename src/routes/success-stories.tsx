import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Bird,
  Calendar,
  Cat,
  Dog,
  Heart,
  Home,
  MapPin,
  MessageSquareHeart,
  PawPrint,
  Plus,
  Quote,
  Search,
  Send,
  Share2,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import pet1Buddy from "@/assets/pet-1-buddy.jpg";
import pet2Luna from "@/assets/pet-2-luna.jpg";
import pet3Milo from "@/assets/pet-3-milo.jpg";
import pet4Rio from "@/assets/pet-4-rio.jpg";
import pet6Simba from "@/assets/pet-6-simba.jpg";
import pet13Olive from "@/assets/pet-13-olive.jpg";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — PawConnect" },
      {
        name: "description",
        content:
          "Read inspiring rescue adoption journeys and heartwarming stories of pets who found their forever families through PawConnect.",
      },
      {
        property: "og:title",
        content: "Pet Adoption Success Stories — PawConnect",
      },
      {
        property: "og:description",
        content:
          "Heartwarming tails of rescue animals and the compassionate humans who welcomed them home.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SuccessStoriesPage,
});

type SuccessStory = {
  id: number;
  pet: string;
  species: "Dog" | "Cat" | "Rabbit" | "Bird";
  breed: string;
  adopter: string;
  location: string;
  date: string;
  image: string;
  quote: string;
  story: string;
  milestones: string[];
  initialLikes: number;
};

const defaultStories: SuccessStory[] = [
  {
    id: 1,
    pet: "Mochi",
    species: "Dog",
    breed: "Golden Retriever Mix",
    adopter: "Aarav & Neha Sharma",
    location: "Mumbai, India",
    date: "June 2026",
    image: pet1Buddy,
    quote:
      "Mochi transformed our evening routine into pure happiness. He's not just a pet; he is our child's most loyal guardian.",
    story:
      "When Mochi arrived at the shelter, he was shy and unsure of himself after being rescued from a highway construction site. Aarav and Neha visited him twice and gave him the patience he needed. By day 4 in their apartment, Mochi claimed the sunny balcony spot and brought his favorite yellow ball to the breakfast table. Today, he greets every neighbor with cheerful tail wags and is fully house-trained!",
    milestones: ["Overcame car anxiety", "Passed beginner obedience", "Beach explorer"],
    initialLikes: 142,
  },
  {
    id: 2,
    pet: "Mishti",
    species: "Cat",
    breed: "Domestic Calico",
    adopter: "The Iyer Family",
    location: "Bengaluru, India",
    date: "April 2026",
    image: pet2Luna,
    quote:
      "She brought a calm, therapeutic rhythm to our bustling home. The children read bedtime stories to her every evening.",
    story:
      "Mishti was discovered with a litter of 4 kittens in an abandoned warehouse. After all her kittens were adopted, Mishti waited patiently for 6 months. The Iyer family saw her profile and fell in love with her gentle emerald eyes. Within two weeks, she established herself as the official supervisor of homeschool hours and loves curling up beside anyone typing on a laptop.",
    milestones: ["Lap cuddle champion", "Gentle with toddlers", "Bird-watching enthusiast"],
    initialLikes: 98,
  },
  {
    id: 3,
    pet: "Pip",
    species: "Rabbit",
    breed: "Mini Rex",
    adopter: "Rhea Sen",
    location: "Pune, India",
    date: "February 2026",
    image: pet3Milo,
    quote:
      "Learning Pip’s silent vocabulary and watching him binky across the living room carpet has brought so much peace to my work-from-home life.",
    story:
      "Pip was surrendered when his previous owners moved abroad. Rhea, an architect working remotely, was looking for a quiet companion. She bunny-proofed her living room, set up a custom two-level castle, and introduced Pip to organic cilantro treats. Today, Pip follows Rhea like a little shadow whenever it's time for lunch snacks.",
    milestones: ["Litter-box pro", "Free-roam certified", "Master of zoomies"],
    initialLikes: 76,
  },
  {
    id: 4,
    pet: "Rio & Sunny",
    species: "Bird",
    breed: "Green-Cheek Conures",
    adopter: "Dev & Priya Patel",
    location: "Ahmedabad, India",
    date: "May 2026",
    image: pet4Rio,
    quote:
      "Our home is filled with cheerful whistles and morning chatter. Adopting bonded birds was the best decision we ever made.",
    story:
      "Rio and Sunny were rescued together and couldn't bear to be separated. Dev and Priya built an expansive indoor flight aviary filled with safe eucalyptus branches and foraging puzzles. The duo now performs gentle whistle serenades every morning at sunrise and loves preening Priya's hair while she reads.",
    milestones: ["Target trained", "Bonded pair thriving", "Foraging puzzle master"],
    initialLikes: 84,
  },
  {
    id: 5,
    pet: "Simba",
    species: "Dog",
    breed: "Indian Indie Breed",
    adopter: "Karan Verma",
    location: "Delhi NCR, India",
    date: "January 2026",
    image: pet6Simba,
    quote:
      "Indie dogs have the biggest hearts and incredible resilience. Simba learned commands in just one week and loves trekking.",
    story:
      "Found shivering in a rainy alleyway as a 3-month pup, Simba showed incredible spirit from day one. Karan wanted an energetic hiking companion who could handle outdoor trails. After positive reinforcement training and lots of nutritious meals, Simba has grown into a sleek, athletic, and fiercely loving partner.",
    milestones: ["Weekend trail runner", "10+ trick repertoire", "Indie advocacy icon"],
    initialLikes: 165,
  },
  {
    id: 6,
    pet: "Nala & Oliver",
    species: "Cat",
    breed: "Tuxedo & Tabby",
    adopter: "Meera Nair",
    location: "Kochi, India",
    date: "March 2026",
    image: pet13Olive,
    quote:
      "They were terrified at the shelter, but patience and high window perches gave them the security to blossom.",
    story:
      "These two shelter seniors had spent nearly a year in foster care. Meera gave them a quiet sanctuary room with soft blankets, zero rush, and warm heating pads. Within a month, Nala began headbutting Meera for cheek scratches, and Oliver started purring like a gentle motor every time dinner was served.",
    milestones: ["Senior adoption victory", "Double cuddle power", "Window garden guards"],
    initialLikes: 112,
  },
];

function SuccessStoriesPage() {
  const [selectedSpecies, setSelectedSpecies] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stories, setStories] = useState<SuccessStory[]>(defaultStories);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);

  // New Story Form State
  const [formData, setFormData] = useState({
    pet: "",
    species: "Dog" as "Dog" | "Cat" | "Rabbit" | "Bird",
    breed: "",
    adopter: "",
    location: "",
    quote: "",
    story: "",
  });

  const toggleLike = (id: number) => {
    if (likedIds.includes(id)) {
      setLikedIds((prev) => prev.filter((item) => item !== id));
      setStories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, initialLikes: s.initialLikes - 1 } : s)),
      );
    } else {
      setLikedIds((prev) => [...prev, id]);
      setStories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, initialLikes: s.initialLikes + 1 } : s)),
      );
      toast.success("Cheered for this happy adoption! ❤️");
    }
  };

  const handleShareStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pet || !formData.adopter || !formData.quote || !formData.story) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const speciesImageMap: Record<string, string> = {
      Dog: pet1Buddy,
      Cat: pet2Luna,
      Rabbit: pet3Milo,
      Bird: pet4Rio,
    };

    const newStoryItem: SuccessStory = {
      id: Date.now(),
      pet: formData.pet,
      species: formData.species,
      breed: formData.breed || "Rescue Special",
      adopter: formData.adopter,
      location: formData.location || "Local Community",
      date: "Just Now",
      image: speciesImageMap[formData.species] || pet1Buddy,
      quote: formData.quote,
      story: formData.story,
      milestones: ["Newly Adopted", "Cherished Family Member"],
      initialLikes: 1,
    };

    setStories([newStoryItem, ...stories]);
    setLikedIds((prev) => [...prev, newStoryItem.id]);
    setFormData({
      pet: "",
      species: "Dog",
      breed: "",
      adopter: "",
      location: "",
      quote: "",
      story: "",
    });
    setOpenModal(false);
    toast.success("Thank you! Your story has been added to PawConnect.");
  };

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesSpecies = selectedSpecies === "All" || story.species === selectedSpecies;
      const matchesSearch =
        !searchQuery ||
        story.pet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.adopter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.breed.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSpecies && matchesSearch;
    });
  }, [stories, selectedSpecies, searchQuery]);

  const featured = stories[0];

  return (
    <main className="page-enter min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative border-b bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-glass px-4 py-2 text-xs font-extrabold uppercase text-teal shadow-sm">
              <MessageSquareHeart className="size-4" />
              Paws & Happy Endings
            </span>
            <h1 className="mt-6 font-display text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
              Tails of Joy: <span className="text-primary">Real Adoption Journeys.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              Every adoption is the beginning of an extraordinary bond. Explore inspiring stories of
              rescue animals who found safety, warmth, and lifelong love with their new families.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/pets">
                  Find Your Own Companion <ArrowRight />
                </Link>
              </Button>

              {/* Submit Story Dialog Trigger */}
              <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline">
                    <Plus className="size-4" /> Share Your Story
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
                  <DialogHeader>
                    <span className="mb-1 w-fit rounded-full bg-primary/15 px-3 py-1 font-display text-xs font-bold text-primary">
                      COMMUNITY SPOTLIGHT
                    </span>
                    <DialogTitle className="font-display text-2xl font-bold">
                      Share Your Adoption Story
                    </DialogTitle>
                    <DialogDescription>
                      Inspire others to choose rescue. Tell us about your pet's journey and what
                      they mean to your family.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleShareStory} className="space-y-4 pt-2">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="petName">Pet's Name *</Label>
                        <Input
                          id="petName"
                          required
                          className="mt-1.5"
                          placeholder="e.g. Mochi, Luna"
                          value={formData.pet}
                          onChange={(e) => setFormData({ ...formData, pet: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="species">Species *</Label>
                        <select
                          id="species"
                          className="mt-1.5 h-11 w-full rounded-xl border bg-background px-3 text-sm"
                          value={formData.species}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              species: e.target.value as "Dog" | "Cat" | "Rabbit" | "Bird",
                            })
                          }
                        >
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                          <option value="Rabbit">Rabbit</option>
                          <option value="Bird">Bird</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="breed">Breed or Mix</Label>
                        <Input
                          id="breed"
                          className="mt-1.5"
                          placeholder="e.g. Indie Mix, Golden"
                          value={formData.breed}
                          onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="adopterName">Your Name(s) *</Label>
                        <Input
                          id="adopterName"
                          required
                          className="mt-1.5"
                          placeholder="e.g. Priya & Rahul"
                          value={formData.adopter}
                          onChange={(e) => setFormData({ ...formData, adopter: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">City / Location</Label>
                      <Input
                        id="location"
                        className="mt-1.5"
                        placeholder="e.g. Pune, India"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="quote">Headline Quote *</Label>
                      <Input
                        id="quote"
                        required
                        className="mt-1.5"
                        placeholder="e.g. He completed our family from day one."
                        value={formData.quote}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="story">Your Adoption Story *</Label>
                      <Textarea
                        id="story"
                        required
                        rows={4}
                        className="mt-1.5"
                        placeholder="Share the details: how they settled in, their favorite habits, and what makes them special..."
                        value={formData.story}
                        onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <Button type="button" variant="ghost" onClick={() => setOpenModal(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Send className="size-4" /> Publish Story
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Impact Counter Bar */}
            <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-surface-glass-border bg-surface-glass p-5 shadow-soft sm:grid-cols-4">
              <div>
                <p className="font-display text-3xl font-black text-teal">1,800+</p>
                <p className="text-xs font-semibold text-muted-foreground">Forever Adoptions</p>
              </div>
              <div>
                <p className="font-display text-3xl font-black text-primary">98.6%</p>
                <p className="text-xs font-semibold text-muted-foreground">Permanent Match Rate</p>
              </div>
              <div>
                <p className="font-display text-3xl font-black text-foreground">150+</p>
                <p className="text-xs font-semibold text-muted-foreground">Partner Shelters</p>
              </div>
              <div>
                <p className="font-display text-3xl font-black text-teal">100%</p>
                <p className="text-xs font-semibold text-muted-foreground">Lifelong Care Circle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight Story Section */}
      {featured && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
                  Spotlight Story
                </span>
                <h2 className="font-display text-3xl font-black sm:text-4xl">
                  Featured Journey: {featured.pet} & {featured.adopter}
                </h2>
              </div>
              <Badge className="hidden bg-primary text-primary-foreground sm:inline-flex">
                Editor’s Choice
              </Badge>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift lg:grid lg:grid-cols-12">
              <div className="relative min-h-72 lg:col-span-6 lg:min-h-full">
                <img
                  src={featured.image}
                  alt={featured.pet}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:hidden" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-surface-glass/90 p-3 backdrop-blur lg:hidden">
                  <p className="font-display text-lg font-bold text-foreground">
                    {featured.pet} ({featured.breed})
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Adopted by {featured.adopter} · {featured.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between p-8 lg:col-span-6 lg:p-12">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-teal">
                    <Calendar className="size-3.5" />
                    <span>Adopted in {featured.date}</span>
                    <span>·</span>
                    <MapPin className="size-3.5" />
                    <span>{featured.location}</span>
                  </div>

                  <blockquote className="mt-4 font-display text-2xl font-bold leading-snug text-foreground sm:text-3xl">
                    “{featured.quote}”
                  </blockquote>

                  <p className="mt-6 text-base leading-7 text-muted-foreground">{featured.story}</p>

                  <div className="mt-6">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                      Adoption Milestones:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {featured.milestones.map((m, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
                        >
                          <Sparkles className="size-3 text-primary" />
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t pt-6">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-full bg-teal/15 font-display font-bold text-teal">
                      {featured.pet.charAt(0)}
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-foreground">
                        {featured.pet}
                      </p>
                      <p className="text-xs text-muted-foreground">Adopted by {featured.adopter}</p>
                    </div>
                  </div>

                  <Button
                    variant={likedIds.includes(featured.id) ? "default" : "outline"}
                    size="sm"
                    className="gap-2"
                    onClick={() => toggleLike(featured.id)}
                  >
                    <Heart
                      className={`size-4 ${likedIds.includes(featured.id) ? "fill-current" : ""}`}
                    />
                    <span>{featured.initialLikes}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Controls */}
      <section className="border-t bg-secondary/50 py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Species Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "All Stories", value: "All", icon: Sparkles },
                { label: "Dogs", value: "Dog", icon: Dog },
                { label: "Cats", value: "Cat", icon: Cat },
                { label: "Rabbits", value: "Rabbit", icon: Sparkles },
                { label: "Birds", value: "Bird", icon: Bird },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = selectedSpecies === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setSelectedSpecies(item.value)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border bg-card text-muted-foreground hover:bg-card hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search pet or adopter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Stories Grid */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story) => {
              const isLiked = likedIds.includes(story.id);
              return (
                <article
                  key={story.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div>
                    {/* Pet Image with overlay */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={story.image}
                        alt={`${story.pet} adopted by ${story.adopter}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-surface-glass px-3 py-1 text-xs font-bold text-teal shadow-sm backdrop-blur">
                        {story.species} · {story.date}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display text-2xl font-bold text-foreground">
                          {story.pet}
                        </h3>
                        <span className="text-xs font-medium text-muted-foreground">
                          {story.breed}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="size-3.5 text-teal" />
                        <span>Adopted by {story.adopter}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="size-3.5 text-teal" />
                        <span>{story.location}</span>
                      </div>

                      <blockquote className="mt-4 border-l-2 border-primary pl-3 font-display text-base font-bold italic leading-snug text-foreground">
                        “{story.quote}”
                      </blockquote>

                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{story.story}</p>

                      {/* Milestones */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {story.milestones.map((m, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom / Reaction */}
                  <div className="flex items-center justify-between border-t border-border/80 bg-secondary/20 px-6 py-4">
                    <span className="text-xs font-medium text-muted-foreground">
                      Fictional demo story
                    </span>
                    <Button
                      variant={isLiked ? "default" : "ghost"}
                      size="sm"
                      className="gap-1.5"
                      onClick={() => toggleLike(story.id)}
                    >
                      <Heart className={`size-4 ${isLiked ? "fill-current" : ""}`} />
                      <span>{story.initialLikes}</span>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredStories.length === 0 && (
            <div className="my-12 rounded-3xl border border-dashed py-16 text-center">
              <PawPrint className="mx-auto size-12 text-muted-foreground" />
              <h3 className="mt-4 font-display text-2xl font-bold">No stories match your search</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try selecting a different pet category or clearing the search box.
              </p>
              <Button
                className="mt-5"
                variant="outline"
                onClick={() => {
                  setSelectedSpecies("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* The Ripple Effect of Adoption */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
              Why Adoption Matters
            </span>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
              The Ripple Effect of Love
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              When you adopt from a shelter or rescue, you aren’t just gaining a best friend—you are
              opening up a spot for another life to be saved.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Save Two Lives",
                desc: "Every adoption saves the animal you welcome home and frees up shelter space, food, and medical resources for another vulnerable pet.",
              },
              {
                icon: Trophy,
                title: "Fight Exploitative Breeding",
                desc: "Choosing rescue directly counters unethical puppy mills and illegal pet trade, advocating for humane animal welfare standards.",
              },
              {
                icon: Sparkles,
                title: "Enrich Your Daily Well-being",
                desc: "Studies show pet companionship significantly reduces stress, increases daily physical activity, and brings continuous joy to households.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="rounded-2xl border-border bg-card p-6 shadow-soft">
                  <div className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-ink px-6 py-16 text-center text-ink-foreground sm:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-soft px-4 py-1.5 text-xs font-extrabold uppercase text-primary">
            <Heart className="size-3.5 fill-current" />
            Your Future Story Begins Here
          </span>
          <h2 className="mt-6 font-display text-4xl font-black sm:text-5xl">
            Ready to Find Your Companion?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            There is a rescue animal waiting right now to share their life, laughter, and devotion
            with you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/pets">
                Browse All Pets <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="footer">
              <Link to="/how-it-works">Learn How Adoption Works</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
