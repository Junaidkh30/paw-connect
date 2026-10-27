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
  Award,
  CheckCircle2,
  Clock,
  Compass,
  Heart,
  HeartHandshake,
  Home,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import pet1Buddy from "@/assets/pet-1-buddy.jpg";
import teamAditi from "@/assets/team-aditi.jpg";
import teamKabir from "@/assets/team-kabir.jpg";
import teamSanjana from "@/assets/team-sanjana.jpg";
import teamTanya from "@/assets/team-tanya.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — PawConnect Animal Welfare" },
      {
        name: "description",
        content:
          "Learn about PawConnect's mission to rescue, rehabilitate, and rehome vulnerable companion animals through ethical fostering and transparent adoption.",
      },
      { property: "og:title", content: "About PawConnect" },
      {
        property: "og:description",
        content:
          "Pioneering compassionate animal rescue, medical vetting, and loving forever adoptions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const coreValues = [
  {
    icon: Heart,
    title: "Compassion Above All",
    desc: "Every animal, regardless of age, medical condition, or breed, deserves gentle care, dignity, and a second chance.",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    icon: ShieldCheck,
    title: "100% Medical Transparency",
    desc: "We perform full veterinary diagnostics, core vaccinations, and behavioral assessments so families have complete clarity.",
    color: "bg-teal/15 text-teal",
  },
  {
    icon: Home,
    title: "Community Foster Haven",
    desc: "We believe home environments are far superior to stressful metal cages. Our network of 400+ foster homes nurtures each pet.",
    color: "bg-primary/15 text-primary",
  },
  {
    icon: Users,
    title: "Lifelong Adopter Circle",
    desc: "Adoption is just step one. We provide ongoing behavioral guidance, vet helplines, and community support for years to come.",
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
];

const teamMembers = [
  {
    name: "Dr. Aditi Rao",
    role: "Chief Veterinary Officer",
    image: teamAditi,
    bio: "12+ years in companion animal surgery and wildlife rehabilitation. Leads our clinical vetting and surgical sterilization protocols.",
    pet: "Adopted mother of 3 Indie rescue dogs.",
  },
  {
    name: "Kabir Mehta",
    role: "Director of Rescue & Field Operations",
    image: teamKabir,
    bio: "Passionate animal behaviorist with a decade of emergency rescue field dispatch and canine rehabilitation experience.",
    pet: "Rescued 2 shelter senior cats.",
  },
  {
    name: "Dr. Sanjana Sen",
    role: "Feline & Small Pet Specialist",
    image: teamSanjana,
    bio: "Certified veterinary behaviorist focusing on stress-free foster acclimation, rabbit health, and multi-pet introductions.",
    pet: "Cares for 2 free-roam rescue rabbits.",
  },
  {
    name: "Tanya Deshmukh",
    role: "Head of Adoption Matchmaking",
    image: teamTanya,
    bio: "Has helped match over 1,200 pets with forever families. Specializes in finding the ideal pet for first-time adopters.",
    pet: "Proud bird guardian & foster mom.",
  },
];

const milestones = [
  {
    year: "2022",
    title: "The First Rescue Haven",
    desc: "Started as a grassroots foster network in Mumbai, rescuing 45 street animals in our first six months.",
  },
  {
    year: "2023",
    title: "Veterinary Diagnostic Partnership",
    desc: "Formed clinic alliances providing subsidized surgeries, vaccinations, and 24/7 emergency response.",
  },
  {
    year: "2024",
    title: "Expanding Across Cities",
    desc: "Extended foster circles to Pune, Bengaluru, and Delhi NCR, passing the 1,000 successful adoptions milestone.",
  },
  {
    year: "2026",
    title: "Digital Adoption Platform",
    desc: "Launched PawConnect to bring radical transparency, detailed behavioral profiles, and seamless matching to animal rescue.",
  },
];

function AboutPage() {
  const [openVolunteerModal, setOpenVolunteerModal] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    role: "Foster Parent",
    experience: "",
  });

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    toast.success(
      `Thank you, ${volunteerForm.name}! Your volunteer application for ${volunteerForm.role} has been received.`,
    );
    setOpenVolunteerModal(false);
    setVolunteerForm({
      name: "",
      email: "",
      phone: "",
      city: "",
      role: "Foster Parent",
      experience: "",
    });
  };

  return (
    <main className="page-enter min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative border-b bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface-glass px-4 py-2 text-xs font-extrabold uppercase text-teal shadow-sm">
                <PawPrint className="size-4" />
                Our Mission & Purpose
              </span>
              <h1 className="mt-6 font-display text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
                Giving Every Rescue Pet a <span className="text-primary">Second Chance.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                PawConnect is dedicated to transforming animal rescue through compassionate foster
                networks, rigorous medical care, and transparent adoption matching.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/pets">
                    Meet Our Pets <ArrowRight />
                  </Link>
                </Button>

                {/* Volunteer Dialog */}
                <Dialog open={openVolunteerModal} onOpenChange={setOpenVolunteerModal}>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outline">
                      <Plus className="size-4" /> Join as a Volunteer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                      <span className="mb-1 w-fit rounded-full bg-teal/15 px-3 py-1 font-display text-xs font-bold text-teal">
                        VOLUNTEER CIRCLE
                      </span>
                      <DialogTitle className="font-display text-2xl font-bold">
                        Become a PawConnect Hero
                      </DialogTitle>
                      <DialogDescription>
                        Lend your time, warmth, and skills to help animals in need. All experience
                        levels welcome!
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleVolunteerSubmit} className="space-y-4 pt-2">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="vName">Your Name *</Label>
                          <Input
                            id="vName"
                            required
                            className="mt-1.5"
                            placeholder="e.g. Ananya Rao"
                            value={volunteerForm.name}
                            onChange={(e) =>
                              setVolunteerForm({
                                ...volunteerForm,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="vEmail">Email Address *</Label>
                          <Input
                            id="vEmail"
                            type="email"
                            required
                            className="mt-1.5"
                            placeholder="ananya@example.com"
                            value={volunteerForm.email}
                            onChange={(e) =>
                              setVolunteerForm({
                                ...volunteerForm,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="vPhone">Phone</Label>
                          <Input
                            id="vPhone"
                            className="mt-1.5"
                            placeholder="+91 98765 43210"
                            value={volunteerForm.phone}
                            onChange={(e) =>
                              setVolunteerForm({
                                ...volunteerForm,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="vCity">City</Label>
                          <Input
                            id="vCity"
                            className="mt-1.5"
                            placeholder="e.g. Mumbai, Pune"
                            value={volunteerForm.city}
                            onChange={(e) =>
                              setVolunteerForm({
                                ...volunteerForm,
                                city: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="vRole">Interested Role</Label>
                        <select
                          id="vRole"
                          className="mt-1.5 h-11 w-full rounded-xl border bg-background px-3 text-sm"
                          value={volunteerForm.role}
                          onChange={(e) =>
                            setVolunteerForm({
                              ...volunteerForm,
                              role: e.target.value,
                            })
                          }
                        >
                          <option value="Foster Parent">Foster Parent (Temporary Home)</option>
                          <option value="Weekend Dog Walker">
                            Weekend Dog Walker & Socializer
                          </option>
                          <option value="Rescue Transport Driver">Rescue Transport Driver</option>
                          <option value="Adoption Event Coordinator">
                            Adoption Event Coordinator
                          </option>
                          <option value="Photography & Media Advocate">
                            Photography & Media Advocate
                          </option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="vExp">Tell us briefly about your pet experience</Label>
                        <Textarea
                          id="vExp"
                          rows={3}
                          className="mt-1.5"
                          placeholder="Have you had pets before? What animals are you most comfortable with?"
                          value={volunteerForm.experience}
                          onChange={(e) =>
                            setVolunteerForm({
                              ...volunteerForm,
                              experience: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-3">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setOpenVolunteerModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          <Send className="size-4" /> Submit Application
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-3xl border border-surface-glass-border bg-card shadow-lift">
                <img
                  src={pet1Buddy}
                  alt="Rescued dog enjoying life"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-ink-foreground">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-teal px-3 py-1 text-xs font-black text-teal-foreground">
                      OUR PLEDGE
                    </span>
                  </div>
                  <p className="mt-2 font-display text-xl font-bold">
                    “Compassion in every rescue. Clarity in every match.”
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Nonprofit demonstration dedicated to ethical animal welfare.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Metric Counters */}
          <div className="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-surface-glass-border bg-surface-glass p-6 shadow-soft sm:grid-cols-4 lg:p-8">
            <div>
              <p className="font-display text-4xl font-black text-teal lg:text-5xl">2,500+</p>
              <p className="mt-1 font-display font-bold text-foreground">Animals Rescued</p>
              <p className="text-xs text-muted-foreground">Safe from harm & neglect</p>
            </div>
            <div>
              <p className="font-display text-4xl font-black text-primary lg:text-5xl">1,800+</p>
              <p className="mt-1 font-display font-bold text-foreground">Forever Homes</p>
              <p className="text-xs text-muted-foreground">Loving family adoptions</p>
            </div>
            <div>
              <p className="font-display text-4xl font-black text-foreground lg:text-5xl">150+</p>
              <p className="mt-1 font-display font-bold text-foreground">Partner Shelters</p>
              <p className="text-xs text-muted-foreground">Collaborative rescue network</p>
            </div>
            <div>
              <p className="font-display text-4xl font-black text-teal lg:text-5xl">400+</p>
              <p className="mt-1 font-display font-bold text-foreground">Foster Families</p>
              <p className="text-xs text-muted-foreground">Nurturing temporary homes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
              Our Compass
            </span>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
              Principles That Guide Us
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every decision we make starts and ends with the physical and emotional well-being of
              the companion animals in our care.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <Card
                  key={idx}
                  className="rounded-2xl border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className={`grid size-12 place-items-center rounded-2xl ${val.color}`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{val.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{val.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story & History Timeline */}
      <section className="border-y bg-secondary py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
              The Journey So Far
            </span>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
              From Grassroots to Community
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              How a small group of animal advocates built a modern, loving adoption ecosystem.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <span className="font-display text-3xl font-black text-primary">{m.year}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Team Section */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
                The Caretakers
              </span>
              <h2 className="mt-2 font-display text-4xl font-black sm:text-5xl">
                Meet Our Leadership Team
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Veterinarians, ethologists, and rescue coordinators devoted to animal welfare.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, idx) => (
              <Card
                key={idx}
                className="overflow-hidden rounded-2xl border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-surface-glass px-3 py-1 text-xs font-bold text-teal shadow-sm backdrop-blur">
                    {member.role.split(" ")[0]} Team
                  </span>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold">{member.name}</h3>
                  <p className="text-xs font-semibold text-primary">{member.role}</p>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">{member.bio}</p>
                  <div className="mt-4 border-t pt-3">
                    <p className="text-[11px] font-semibold text-teal">🐾 {member.pet}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Sanctuary Campus Information */}
      <section className="border-t bg-secondary/50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
                Get in Touch
              </span>
              <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
                We’d Love to Hear From You
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Whether you have questions about adoption, want to foster an animal, or want to
                partner with your shelter, our team is always here to help.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <div className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground">
                      Email Helpline
                    </p>
                    <p className="font-display font-bold text-foreground">
                      junaidstudy123@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <div className="grid size-12 place-items-center rounded-xl bg-teal/15 text-teal">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground">
                      Adoption Desk Phone
                    </p>
                    <p className="font-display font-bold text-foreground">+91 (022) 4567-8900</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <div className="grid size-12 place-items-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground">
                      Sanctuary HQ (Demo Campus)
                    </p>
                    <p className="font-display font-bold text-foreground">
                      Kindred Paws Collective, Mumbai & Pune, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                <h3 className="font-display text-2xl font-bold">Send Us a Direct Message</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Demo contact form · Responds instantly in this browser
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success(
                      "Message sent! Our adoption coordinators will review your inquiry.",
                    );
                    (e.target as HTMLFormElement).reset();
                  }}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <Label htmlFor="cName">Your Name</Label>
                    <Input id="cName" required placeholder="e.g. Rahul Sharma" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="cEmail">Email Address</Label>
                    <Input
                      id="cEmail"
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cMsg">How can we assist you?</Label>
                    <Textarea
                      id="cMsg"
                      required
                      rows={3}
                      placeholder="Inquire about adoption, fostering, volunteering, or donations..."
                      className="mt-1.5"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="size-4" /> Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-ink px-6 py-16 text-center text-ink-foreground sm:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-soft px-4 py-1.5 text-xs font-extrabold uppercase text-primary">
            <Heart className="size-3.5 fill-current" />
            Join Our Mission
          </span>
          <h2 className="mt-6 font-display text-4xl font-black sm:text-5xl">
            Be Part of Their Second Chance
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Whether adopting, donating, or fostering, your kindness directly changes an animal’s
            life forever.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/pets">
                Browse Adoptable Pets <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="footer">
              <Link to="/donate">Support With a Donation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
