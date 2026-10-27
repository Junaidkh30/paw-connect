import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Dog,
  Cat,
  Sparkles,
  Heart,
  HeartHandshake,
  Home,
  PawPrint,
  Search,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";
import { useState } from "react";
import pet1Buddy from "@/assets/pet-1-buddy.jpg";
import pet2Luna from "@/assets/pet-2-luna.jpg";
import pet3Milo from "@/assets/pet-3-milo.jpg";
import pet4Rio from "@/assets/pet-4-rio.jpg";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Pet Adoption Works — PawConnect" },
      {
        name: "description",
        content:
          "Discover the simple, caring 4-step process to adopt a rescue pet through PawConnect. Transparent vetting, meet-and-greets, and lifelong support.",
      },
      { property: "og:title", content: "How Adoption Works — PawConnect" },
      {
        property: "og:description",
        content:
          "Step-by-step guide to finding and adopting your rescue pet companion with PawConnect.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

const adoptionSteps = [
  {
    step: "01",
    title: "Explore & Shortlist",
    subtitle: "Find pets that match your lifestyle and home energy",
    timeframe: "At your pace · 1–2 days",
    icon: Search,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    image: pet1Buddy,
    description:
      "Browse our curated catalog of rescue animals. Filter by species, age, temperament, size, and compatibility with kids or other pets.",
    details: [
      "Filter by activity level, living requirements, and personality",
      "Save favorites to your browser list for quick comparison",
      "Read detailed behavioral observations from shelter caregivers",
      "Review transparent health, vaccination, and sterilization status",
    ],
    tip: "Look beyond just looks! Consider your daily schedule, energy level, and home space when shortlisting candidates.",
  },
  {
    step: "02",
    title: "Submit a Quick Application",
    subtitle: "Share details about your household and daily routine",
    timeframe: "5 mins to apply · 24–48 hr review",
    icon: HeartHandshake,
    color: "bg-teal/15 text-teal",
    image: pet2Luna,
    description:
      "Fill out our straightforward adoption inquiry. This helps our coordinators verify that the pet's unique needs align with your living environment.",
    details: [
      "100% online form with no lengthy paperwork or upfront fees",
      "Share details on housing type (apartment vs yard), work hours, and past experience",
      "Helps matchmakers identify any special support or acclimation needed",
      "Quick response from shelter volunteers within 1 to 2 business days",
    ],
    tip: "Honesty is key! There is no 'perfect' home—we simply strive for the right mutual match for long-term happiness.",
  },
  {
    step: "03",
    title: "Meet & Greet Connection",
    subtitle: "Experience zero-pressure one-on-one time with your potential pet",
    timeframe: "Flexible scheduling · 45–60 mins",
    icon: Users,
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    image: pet3Milo,
    description:
      "Meet your prospective companion in a comfortable, relaxed environment. See their natural temperament and see if the spark is there for everyone.",
    details: [
      "In-person visit at a foster home, rescue sanctuary, or virtual video call",
      "Bring other family members and resident dogs for controlled introductions",
      "Observe behavior, play style, affection cues, and leash manners",
      "Ask our animal caretakers any detailed questions about their routine",
    ],
    tip: "Give shy animals time to warm up. Sit at their level, offer a treat gently, and let them approach at their own pace.",
  },
  {
    step: "04",
    title: "Welcome Home & Lifelong Support",
    subtitle: "Finalize adoption details and bring your companion home",
    timeframe: "Same-day handover after approval",
    icon: Home,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    image: pet4Rio,
    description:
      "Sign the adoption pledge, receive all medical records and starter care tips, and officially welcome your new family member home.",
    details: [
      "Complete medical passport: vaccination history, deworming, and microchip ID",
      "Starter pack with sample transition food and adoption checklist",
      "Access to our 30-day post-adoption helpline for behavior & vet questions",
      "Join our supportive community of adopters for tips and meetups",
    ],
    tip: "Remember the 3-3-3 rule: 3 days to decompress, 3 weeks to learn the routine, 3 months to feel completely at home.",
  },
];

const includedBenefits = [
  {
    icon: Stethoscope,
    title: "Comprehensive Vet Exam",
    description:
      "Full nose-to-tail clinical screening, orthopedic check, coat & ear evaluation, and dental inspection prior to adoption.",
  },
  {
    icon: Syringe,
    title: "Core Vaccinations Up-to-Date",
    description:
      "All essential age-appropriate vaccines (Rabies, DHPP for dogs, FVRCP for cats) administered by certified veterinarians.",
  },
  {
    icon: ShieldCheck,
    title: "Spayed or Neutered",
    description:
      "Every eligible pet is sterilized before leaving our care to promote lifelong health and curb companion animal homelessness.",
  },
  {
    icon: BadgeCheck,
    title: "Microchipped & Registered",
    description:
      "Pre-implanted lifetime microchip registered to your contact info for permanent safety and recovery peace of mind.",
  },
  {
    icon: PawPrint,
    title: "Behavioral & Social Profile",
    description:
      "Tested for temperament, household compatibility, leash readiness, and social interaction with other animals.",
  },
  {
    icon: Heart,
    title: "30-Day Transition Support",
    description:
      "Direct guidance from our volunteer coordinators and trainers to help your pet settle comfortably into their new routine.",
  },
];

const readinessQuestions = [
  {
    id: "time",
    label: "Time Commitment",
    text: "I have at least 2 hours daily for feeding, exercise, mental stimulation, and affection.",
  },
  {
    id: "housing",
    label: "Pet-Friendly Housing",
    text: "My housing arrangement permits pets and offers a secure, comfortable living environment.",
  },
  {
    id: "budget",
    label: "Budget & Healthcare",
    text: "I am financially prepared for recurring food, grooming, preventive care, and unexpected vet visits.",
  },
  {
    id: "family",
    label: "Household Alignment",
    text: "Everyone in my household agrees and looks forward to sharing space with a companion animal.",
  },
  {
    id: "lifelong",
    label: "Long-term Dedication",
    text: "I am committed to caring for this pet through all life stages, moves, and lifestyle changes (10–15+ years).",
  },
];

const faqs = [
  {
    q: "How much does it cost to adopt a pet, and what is included?",
    a: "PawConnect showcases fictional profiles with standard nonprofit adoption fee guidelines (₹2,000–₹5,000). This modest fee covers comprehensive veterinary examinations, core vaccinations, spay/neuter surgery, deworming, and microchip registration. You receive a pet with medical investments often exceeding ₹15,000 in private clinic costs.",
  },
  {
    q: "Can I adopt if I live in an apartment or rent my home?",
    a: "Yes, absolutely! Many dogs, cats, and small animals thrive in apartments. What matters most is providing daily exercise, mental enrichment, and love. We recommend checking your landlord or building pet policy before applying.",
  },
  {
    q: "What if I already have other pets at home?",
    a: "We actively screen and tag pets that are friendly with other dogs, cats, or small animals. During Step 3 (Meet & Greet), we coordinate structured animal introductions to ensure existing pets and newcomers feel safe and comfortable together.",
  },
  {
    q: "How long does the entire adoption process take?",
    a: "Typically between 2 to 5 business days from your first application to adoption day. This gives enough time for application review, a relaxing meet-and-greet, and home preparation without unnecessary delays.",
  },
  {
    q: "What is the 3-3-3 rule for adopted pets?",
    a: "The 3-3-3 guideline describes your pet's adjustment phases: The first 3 days they may feel overwhelmed or shy and need quiet space. In 3 weeks, they understand your daily routine and show their true personality. By 3 months, they feel secure, trusting, and fully at home.",
  },
  {
    q: "What happens if the pet is not the right fit for my family?",
    a: "While our thorough matching process results in a 98% forever placement rate, life happens. In the rare event an adoption doesn't work out, our partner rescues provide a safe return policy to ensure the animal is never abandoned.",
  },
  {
    q: "Can first-time pet owners adopt through PawConnect?",
    a: "Definitely! We have many beginner-friendly, mellow companions who are gentle, patient, and easy to care for. Our adoption coordinators will gladly recommend pets ideal for first-time adopters.",
  },
];

function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [checkedReadiness, setCheckedReadiness] = useState<string[]>(["time", "housing"]);

  const toggleReadiness = (id: string) => {
    setCheckedReadiness((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const readinessScore = Math.round((checkedReadiness.length / readinessQuestions.length) * 100);

  return (
    <main className="page-enter min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative border-b bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-surface-glass px-4 py-2 text-xs font-extrabold uppercase text-teal shadow-sm">
                <PawPrint className="size-4" />
                Compassionate & Transparent Process
              </span>
              <h1 className="mt-6 font-display text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
                From Our Rescue to <span className="text-primary">Your Loving Arms.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Adopting a pet should be joyful, stress-free, and clear. Learn how our 4-step
                pathway connects caring families with rescue animals ready for a second chance.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/pets">
                    Browse Adoptable Pets <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    document
                      .getElementById("steps-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <a href="#steps-section">See the 4 Steps</a>
                </Button>
              </div>

              {/* Metric badges */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
                <div>
                  <p className="font-display text-2xl font-black text-teal sm:text-3xl">4 Steps</p>
                  <p className="text-xs font-medium text-muted-foreground">Streamlined journey</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-primary sm:text-3xl">100%</p>
                  <p className="text-xs font-medium text-muted-foreground">Health vetted pets</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-foreground sm:text-3xl">
                    24–48h
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">Average review</p>
                </div>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="relative">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-surface-glass-border bg-card shadow-lift">
                <img
                  src={pet1Buddy}
                  alt="Happy adopted dog with family"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-ink-foreground">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground">
                      SAFE & CARING
                    </span>
                    <span className="text-xs font-semibold text-ink-muted">
                      No pressure adoption
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold">
                    “The smoothest match we could have wished for.”
                  </h3>
                  <p className="mt-1 text-xs text-ink-muted">
                    Over 1,800 happy companions placed in loving forever homes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Interactive Roadmap */}
      <section id="steps-section" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
              The Adoption Blueprint
            </span>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
              Your 4-Step Journey Home
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We have refined the adoption process so you always know what comes next, ensuring both
              your family and your pet are set up for success.
            </p>
          </div>

          {/* Stepper Tabs Navigation */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {adoptionSteps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`group flex flex-col items-start rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-card shadow-warm ring-2 ring-primary/20"
                      : "border-border bg-card/60 hover:border-border hover:bg-card"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`font-display text-sm font-black ${
                        isSelected ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      STEP {step.step}
                    </span>
                    <span
                      className={`grid size-8 place-items-center rounded-xl text-xs font-bold transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                  </div>
                  <h3
                    className={`mt-4 font-display text-lg font-bold transition-colors ${
                      isSelected ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3 text-teal" />
                    {step.timeframe.split("·")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Feature Box */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            {(() => {
              const current = adoptionSteps[activeStep] ?? adoptionSteps[0]!;
              const StepIcon = current.icon;
              return (
                <div className="grid lg:grid-cols-12">
                  <div className="p-8 lg:col-span-7 lg:p-12">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-primary/15 px-3 py-1 font-display text-xs font-black text-primary">
                        STEP {current.step} OF 04
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground">
                        <Clock className="size-3.5 text-teal" />
                        {current.timeframe}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-3xl font-black text-foreground sm:text-4xl">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-base font-semibold text-teal">{current.subtitle}</p>
                    <p className="mt-4 text-base leading-7 text-muted-foreground">
                      {current.description}
                    </p>

                    <div className="mt-8 space-y-3">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                        What happens in this stage:
                      </p>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {current.details.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 rounded-xl bg-secondary/50 p-3 text-sm"
                          >
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal" />
                            <span className="leading-snug">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 dark:bg-amber-500/10">
                      <div className="flex items-start gap-3">
                        <Sparkles className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
                        <div>
                          <p className="text-xs font-extrabold uppercase text-amber-700 dark:text-amber-300">
                            Adopter Pro Tip
                          </p>
                          <p className="mt-1 text-sm text-amber-900/90 dark:text-amber-200/90">
                            {current.tip}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {activeStep > 0 && (
                        <Button variant="outline" onClick={() => setActiveStep((v) => v - 1)}>
                          Previous Step
                        </Button>
                      )}
                      {activeStep < adoptionSteps.length - 1 ? (
                        <Button onClick={() => setActiveStep((v) => v + 1)}>
                          Next: {adoptionSteps[activeStep + 1]?.title ?? ""} <ArrowRight />
                        </Button>
                      ) : (
                        <Button asChild>
                          <Link to="/pets">
                            Ready! Browse Pets <ArrowRight />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="relative min-h-64 bg-secondary lg:col-span-5 lg:min-h-full">
                    <img
                      src={current.image}
                      alt={current.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/40" />
                    <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-surface-glass-border bg-surface-glass p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div
                          className={`grid size-10 place-items-center rounded-xl ${current.color}`}
                        >
                          <StepIcon className="size-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase text-muted-foreground">
                            Phase {current.step}
                          </p>
                          <p className="font-display text-base font-bold text-foreground">
                            {current.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* What is Included Section */}
      <section className="border-y bg-secondary py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
              The PawConnect Guarantee
            </span>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
              What’s Included in Every Adoption
            </h2>
            <p className="mt-4 text-muted-foreground">
              We never cut corners when it comes to animal welfare. Every rescue pet receives
              complete medical care, behavior vetting, and starter essentials before entering their
              new home.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {includedBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="rounded-2xl border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="grid size-12 place-items-center rounded-2xl bg-teal/15 text-teal">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Adoption Readiness Checklist */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
                Self Assessment
              </span>
              <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
                Are You Ready to Adopt?
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Welcoming a pet is one of life’s greatest rewards. Use this quick interactive
                checklist to see if your lifestyle, space, and schedule are in sync with a new furry
                companion.
              </p>

              {/* Progress Box */}
              <div className="mt-8 rounded-2xl border bg-card p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Readiness Score</span>
                  <span className="font-display text-2xl font-black text-primary">
                    {readinessScore}%
                  </span>
                </div>
                <Progress value={readinessScore} className="mt-3 h-2.5" />
                <p className="mt-4 text-xs font-medium text-muted-foreground">
                  {readinessScore === 100
                    ? "🎉 Fantastic! You have the foundation in place for a lifelong adoption bond."
                    : readinessScore >= 60
                      ? "👍 Great start! Review the remaining items to ensure a seamless transition."
                      : "💡 Take your time! Read our guides and prepare your home before adopting."}
                </p>
                <div className="mt-6 border-t pt-4">
                  <Button asChild className="w-full" variant="soft">
                    <Link to="/pets">
                      {readinessScore === 100
                        ? "Browse Pets Ready for You"
                        : "Explore Adoptable Pets"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-7">
              {readinessQuestions.map((q) => {
                const isChecked = checkedReadiness.includes(q.id);
                return (
                  <label
                    key={q.id}
                    onClick={() => toggleReadiness(q.id)}
                    className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-all duration-200 ${
                      isChecked
                        ? "border-teal/50 bg-teal/5 shadow-sm dark:bg-teal/10"
                        : "border-border bg-card hover:bg-secondary/40"
                    }`}
                  >
                    <div
                      className={`mt-1 grid size-6 shrink-0 place-items-center rounded-lg border transition-colors ${
                        isChecked
                          ? "border-teal bg-teal text-teal-foreground"
                          : "border-muted-foreground/30 bg-background"
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="size-4" />}
                    </div>
                    <div>
                      <span className="font-display text-base font-bold text-foreground">
                        {q.label}
                      </span>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{q.text}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Preparing Your Home - Tabs */}
      <section className="border-t bg-secondary py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
              Home Preparation
            </span>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
              Getting Your Space Ready
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Different companions have different home setup needs. Here is a quick starter prep
              list before bringing your friend home:
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <Tabs defaultValue="dogs" className="w-full">
              <div className="flex justify-center">
                <TabsList className="h-12 rounded-xl bg-card p-1 shadow-soft">
                  <TabsTrigger
                    value="dogs"
                    className="flex items-center gap-2 rounded-lg px-5 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Dog className="size-4" /> Dogs & Pups
                  </TabsTrigger>
                  <TabsTrigger
                    value="cats"
                    className="flex items-center gap-2 rounded-lg px-5 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Cat className="size-4" /> Cats & Kittens
                  </TabsTrigger>
                  <TabsTrigger
                    value="small"
                    className="flex items-center gap-2 rounded-lg px-5 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Sparkles className="size-4" /> Small Animals & Birds
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Dog Tab */}
              <TabsContent value="dogs" className="mt-8">
                <Card className="border-border bg-card p-8 shadow-soft">
                  <h3 className="font-display text-2xl font-bold">Dog Home Setup Essentials</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Dogs need clear boundaries, a secure outdoor area or leash routine, and
                    dedicated resting spots.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: "Comfortable Dog Bed & Crate",
                        desc: "A quiet sanctuary where they can sleep undisturbed without foot traffic.",
                      },
                      {
                        title: "Sturdy Leash, Collar & ID Tag",
                        desc: "Standard 6-foot non-retractable leash and fitted harness for safety.",
                      },
                      {
                        title: "Stainless Steel Food & Water Bowls",
                        desc: "Easy to sanitize and heavy enough to avoid tipping during mealtime.",
                      },
                      {
                        title: "Enrichment & Chew Toys",
                        desc: "KONG toys, puzzle feeders, and safe chew ropes to channel energy.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="rounded-xl border bg-secondary/40 p-4">
                        <p className="font-display font-bold text-foreground">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Cat Tab */}
              <TabsContent value="cats" className="mt-8">
                <Card className="border-border bg-card p-8 shadow-soft">
                  <h3 className="font-display text-2xl font-bold">Cat Home Setup Essentials</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cats thrive on vertical territory, clean litter facilities, and calm acclimation
                    zones.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: "Litter Box & Unscented Litter",
                        desc: "1 box per cat plus one extra, placed in a quiet, accessible corner.",
                      },
                      {
                        title: "Scratching Posts & Vertical Trees",
                        desc: "Sisal posts and window perches to allow natural stretching and climbing.",
                      },
                      {
                        title: "Quiet Sanctuary Room",
                        desc: "A spare bedroom or bathroom for the first 3–5 days to decompress.",
                      },
                      {
                        title: "Interactive Wand & Feather Toys",
                        desc: "Daily 15-minute play sessions to build trust and stimulate natural instincts.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="rounded-xl border bg-secondary/40 p-4">
                        <p className="font-display font-bold text-foreground">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Small Pet Tab */}
              <TabsContent value="small" className="mt-8">
                <Card className="border-border bg-card p-8 shadow-soft">
                  <h3 className="font-display text-2xl font-bold">
                    Rabbits & Birds Setup Essentials
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Small companions require safe pen areas, proper temperature control, and
                    species-specific dietary staples.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: "Spacious Enclosure & Exercise Pen",
                        desc: "Ample room for daily hopping, foraging, and wing stretching.",
                      },
                      {
                        title: "Fresh Hay & Species Pellets",
                        desc: "Unlimited fresh Timothy hay for rabbits; formulated pellets for birds.",
                      },
                      {
                        title: "Bunny/Bird Proofed Exploration Area",
                        desc: "Cover exposed electrical cords and remove toxic houseplants.",
                      },
                      {
                        title: "Foraging Puzzles & Natural Perches",
                        desc: "Natural wood chews and variety perches to keep beaks and claws healthy.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="rounded-xl border bg-secondary/40 p-4">
                        <p className="font-display font-bold text-foreground">{item.title}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
              Got Questions?
            </span>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything you need to know about adoption procedures, fees, and our compassionate
              matching policies.
            </p>
          </div>

          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-border bg-card px-6 py-1 shadow-soft"
                >
                  <AccordionTrigger className="font-display text-base font-bold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-6 text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-ink px-6 py-16 text-center text-ink-foreground sm:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-soft px-4 py-1.5 text-xs font-extrabold uppercase text-primary">
            <Heart className="size-3.5 fill-current" />
            Your New Family Member Is Waiting
          </span>
          <h2 className="mt-6 font-display text-4xl font-black sm:text-5xl">
            Start Your Adoption Journey Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Explore 16+ lovely fictional rescue profiles, save your favorites, and discover the
            unconditional love only a companion animal can bring.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/pets">
                Browse All Pets <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="footer">
              <Link to="/favorites">View Your Saved Pets</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
