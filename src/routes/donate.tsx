import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Gift,
  HandHeart,
  Heart,
  HeartHandshake,
  HelpCircle,
  Lock,
  PackageCheck,
  PawPrint,
  PiggyBank,
  QrCode,
  Receipt,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Truck,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate & Support Rescue Pets — PawConnect" },
      {
        name: "description",
        content:
          "Help save vulnerable animals. 100% of donations directly support emergency medical surgeries, vaccinations, nourishing food, and foster care.",
      },
      { property: "og:title", content: "Donate to PawConnect Rescue" },
      {
        property: "og:description",
        content:
          "Every contribution provides life-saving medical care and shelter for rescue pets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DonatePage,
});

const presetAmounts = [
  {
    amount: 500,
    label: "₹500",
    impact: "Feeds 2 rescue puppies or kittens nourishing meals for a full week.",
  },
  {
    amount: 1000,
    label: "₹1,000",
    impact: "Covers complete core vaccination series (Rabies, DHPP/FVRCP) & deworming.",
  },
  {
    amount: 2500,
    label: "₹2,500",
    popular: true,
    impact: "Funds a safe spay/neuter surgery and post-operative pain medication.",
  },
  {
    amount: 5000,
    label: "₹5,000",
    impact: "Provides emergency intake diagnostics, blood panels, and orthopedic x-rays.",
  },
  {
    amount: 10000,
    label: "₹10,000",
    impact: "Sponsors life-saving surgery or ICU hospital recovery for an injured rescue.",
  },
];

const transparencyPillars = [
  {
    percentage: 78,
    title: "Veterinary Surgeries & Medical Care",
    desc: "Emergency procedures, spay/neuter, vaccinations, diagnostic imaging, and post-trauma rehab.",
    icon: Stethoscope,
    color: "bg-teal",
  },
  {
    percentage: 12,
    title: "Food, Nutrition & Warm Bedding",
    desc: "Species-specific high protein kibble, infant puppy/kitten milk formulas, and cozy clean bedding.",
    icon: Utensils,
    color: "bg-primary",
  },
  {
    percentage: 6,
    title: "Rescue Transport & Field Ambulance",
    desc: "Emergency field response vehicles, crate transport, and medical rescue dispatches.",
    icon: Truck,
    color: "bg-sky-500",
  },
  {
    percentage: 4,
    title: "Community Outreach & Adoption Events",
    desc: "Foster family training kits, public adoption fairs, and humane education programs.",
    icon: Users,
    color: "bg-amber-500",
  },
];

const sampleDonors = [
  {
    name: "Aarav Sharma",
    amount: "₹2,500",
    type: "One-Time",
    time: "10 mins ago",
    note: "In loving memory of Bruno 🐾",
  },
  {
    name: "Priya Menon",
    amount: "₹1,000/mo",
    type: "Monthly Guardian",
    time: "35 mins ago",
    note: "For the street pups waiting for homes.",
  },
  {
    name: "Vikram & Ananya",
    amount: "₹5,000",
    type: "One-Time",
    time: "2 hours ago",
    note: "Thank you for the wonderful rescue work!",
  },
  {
    name: "Rhea Sen",
    amount: "₹500/mo",
    type: "Monthly Guardian",
    time: "4 hours ago",
    note: "Proud rabbit adopter & monthly supporter.",
  },
];

const donateFaqs = [
  {
    q: "How is my donation used?",
    a: "78% of all funds directly cover life-saving veterinary medical treatments, emergency surgeries, and medicines. 12% funds daily meals and bedding, 6% maintains our rescue field transport, and 4% coordinates foster programs and adoption events.",
  },
  {
    q: "Is this donation tax-deductible?",
    a: "PawConnect operates as a demonstration project showcasing non-profit best practices. In real-world registered charities, donations qualify under Section 80G (India) or 501(c)(3) (US) tax deduction provisions.",
  },
  {
    q: "Can I donate physical supplies instead of money?",
    a: "Yes! Our partner shelters always welcome unopened high-protein dry food, clean blankets, towels, stainless steel food bowls, durable chew toys, and cat scratching towers.",
  },
  {
    q: "How can I cancel or adjust my recurring monthly contribution?",
    a: "Monthly Guardian subscriptions can be paused, increased, or cancelled anytime with a single click from your donor dashboard with zero cancellation penalties.",
  },
  {
    q: "Can I make a dedication donation in honor or memory of a loved one?",
    a: "Yes! You can check the 'Dedicate this donation' option during checkout to add a memorial note or tribute to a beloved pet or family member.",
  },
];

function DonatePage() {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [dedication, setDedication] = useState<string>("");
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

  const activeAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  const currentImpact = useMemo(() => {
    if (activeAmount >= 10000) {
      return "Sponsors a critical life-saving orthopedic surgery or multi-week ICU hospital recovery.";
    }
    if (activeAmount >= 5000) {
      return "Provides emergency intake diagnostics, blood panels, and trauma x-rays.";
    }
    if (activeAmount >= 2500) {
      return "Funds a safe spay/neuter surgery, anesthesia, and post-op recovery care.";
    }
    if (activeAmount >= 1000) {
      return "Covers complete core vaccination series (Rabies, DHPP/FVRCP) & deworming.";
    }
    if (activeAmount >= 500) {
      return "Feeds 2 rescue puppies or kittens nourishing meals for a full week.";
    }
    return "Contributes essential daily food and clean bedding for shelter pets.";
  }, [activeAmount]);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAmount || activeAmount <= 0) {
      toast.error("Please select or enter a valid donation amount.");
      return;
    }
    if (!donorName || !donorEmail) {
      toast.error("Please enter your name and email address.");
      return;
    }

    setShowSuccessDialog(true);
    toast.success(
      `Thank you, ${donorName}! Your generous demo donation of ₹${activeAmount.toLocaleString("en-IN")} was recorded.`,
    );
  };

  return (
    <main className="page-enter min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative border-b bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface-glass px-4 py-2 text-xs font-extrabold uppercase text-teal shadow-sm">
                <HeartHandshake className="size-4" />
                Support Rescue & Healing
              </span>
              <h1 className="mt-6 font-display text-5xl font-black leading-[1.05] sm:text-6xl">
                Every Contribution <span className="text-primary">Saves a Life.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Your generosity provides emergency veterinary surgeries, enriching nutrition, safe
                foster havens, and the medical care rescue animals need before finding their forever
                families.
              </p>

              {/* Highlight Metrics */}
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-3">
                <div>
                  <p className="font-display text-2xl font-black text-teal sm:text-3xl">850+</p>
                  <p className="text-xs font-medium text-muted-foreground">Surgeries Funded</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-primary sm:text-3xl">120k+</p>
                  <p className="text-xs font-medium text-muted-foreground">Meals Served</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-foreground sm:text-3xl">
                    100%
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">Nonprofit Mission</p>
                </div>
              </div>
            </div>

            {/* Right Donation Form Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold">Make a Donation</h2>
                    <p className="text-xs text-muted-foreground">
                      Frontend demonstration · No real charges
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal/15 px-3 py-1 text-xs font-bold text-teal">
                    <ShieldCheck className="size-3.5" /> 256-bit Secure
                  </span>
                </div>

                <form onSubmit={handleDonate} className="space-y-6">
                  {/* Frequency Switcher */}
                  <div className="grid grid-cols-2 gap-2 rounded-xl bg-secondary p-1">
                    <button
                      type="button"
                      onClick={() => setFrequency("monthly")}
                      className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all ${
                        frequency === "monthly"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Sparkles className="size-4 text-primary" /> Monthly Guardian
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency("one-time")}
                      className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all ${
                        frequency === "one-time"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Gift className="size-4 text-teal" /> One-Time Gift
                    </button>
                  </div>

                  {/* Preset Amount Grid */}
                  <div>
                    <Label className="text-xs font-bold uppercase text-muted-foreground">
                      Select Amount
                    </Label>
                    <div className="mt-2 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                      {presetAmounts.map((p) => {
                        const isSelected = !isCustom && selectedAmount === p.amount;
                        return (
                          <button
                            key={p.amount}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(p.amount);
                              setIsCustom(false);
                            }}
                            className={`relative flex flex-col items-center justify-center rounded-xl border p-3 font-display text-lg font-black transition-all ${
                              isSelected
                                ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                                : "border-border bg-background text-foreground hover:border-border hover:bg-secondary/40"
                            }`}
                          >
                            {p.popular && (
                              <span className="absolute -top-2.5 rounded-full bg-primary px-1.5 py-0.2 text-[9px] font-extrabold uppercase text-primary-foreground">
                                Popular
                              </span>
                            )}
                            {p.label}
                            {frequency === "monthly" && (
                              <span className="text-[10px] font-bold text-muted-foreground">
                                /mo
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Amount Input */}
                    <div className="mt-3">
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-sm font-bold text-muted-foreground">
                          ₹
                        </span>
                        <Input
                          type="number"
                          placeholder="Or enter custom amount in INR"
                          className="pl-8"
                          value={customAmount}
                          onFocus={() => setIsCustom(true)}
                          onChange={(e) => {
                            setIsCustom(true);
                            setCustomAmount(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Live Impact Preview Box */}
                  <div className="rounded-2xl border border-teal/30 bg-teal/5 p-4 dark:bg-teal/10">
                    <div className="flex items-start gap-3">
                      <HandHeart className="mt-0.5 size-5 shrink-0 text-teal" />
                      <div>
                        <p className="text-xs font-extrabold uppercase text-teal">
                          Your Impact ({frequency === "monthly" ? "Monthly" : "One-Time"} ₹
                          {activeAmount ? activeAmount.toLocaleString("en-IN") : 0})
                        </p>
                        <p className="mt-1 text-sm text-foreground">{currentImpact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="donorName">Full Name *</Label>
                      <Input
                        id="donorName"
                        required
                        className="mt-1.5"
                        placeholder="e.g. Priya Sharma"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="donorEmail">Email Address *</Label>
                      <Input
                        id="donorEmail"
                        type="email"
                        required
                        className="mt-1.5"
                        placeholder="priya@example.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Dedication Note */}
                  <div>
                    <Label htmlFor="dedication">Dedicate this gift (Optional)</Label>
                    <Input
                      id="dedication"
                      className="mt-1.5"
                      placeholder="e.g. In honor of Max, or for street pups"
                      value={dedication}
                      onChange={(e) => setDedication(e.target.value)}
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <Label className="text-xs font-bold uppercase text-muted-foreground">
                      Payment Mode (Demo)
                    </Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[
                        { id: "card", label: "Card", icon: CreditCard },
                        { id: "upi", label: "UPI / GPay", icon: QrCode },
                        { id: "netbanking", label: "NetBank", icon: Wallet },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = paymentMethod === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setPaymentMethod(item.id)}
                            className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-bold transition-all ${
                              isSelected
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-background text-muted-foreground"
                            }`}
                          >
                            <Icon className="size-4" />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full text-base">
                    <Heart className="size-4 fill-current" /> Donate ₹
                    {activeAmount ? activeAmount.toLocaleString("en-IN") : 0}{" "}
                    {frequency === "monthly" ? "Monthly" : "Now"}
                  </Button>

                  <p className="text-center text-[11px] text-muted-foreground">
                    🔒 SSL Encrypted demonstration. No actual funds are deducted.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Transparency Section */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
              Accountability & Trust
            </span>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
              Where Every Rupee Goes
            </h2>
            <p className="mt-4 text-muted-foreground">
              We operate with rigorous transparency. Here is how every contribution directly
              transforms into life-saving care, warm shelter, and forever homes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {transparencyPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Card key={idx} className="rounded-2xl border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="grid size-12 place-items-center rounded-2xl bg-secondary text-foreground">
                      <Icon className="size-6 text-teal" />
                    </div>
                    <span className="font-display text-3xl font-black text-primary">
                      {pillar.percentage}%
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{pillar.desc}</p>
                  <Progress value={pillar.percentage} className="mt-4 h-2" />
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="border-y bg-secondary py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
              More Ways to Support
            </span>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
              Other Ways to Make a Difference
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Financial giving is just one way to help. Explore in-kind donations, pet sponsorships,
              and corporate matching programs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: PackageCheck,
                title: "Shelter Care Wishlist",
                desc: "Donate unopened pet food, chew toys, comfortable fleece blankets, and medical disinfectants directly to our rescue partners.",
                action: "View Supply List",
              },
              {
                icon: Award,
                title: "Sponsor a Sanctuary Pet",
                desc: "Provide ongoing monthly support for senior dogs, special-needs cats, or long-term shelter residents awaiting their match.",
                action: "Browse Sanctuary Pets",
              },
              {
                icon: PiggyBank,
                title: "Corporate Giving & Match",
                desc: "Many employers match charitable donations rupee-for-rupee. Check with your HR team to double your donation’s reach.",
                action: "Learn About Matching",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className="flex flex-col justify-between rounded-2xl border-border bg-card p-6 shadow-soft"
                >
                  <div>
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="mt-6 border-t pt-4">
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/pets">
                        {item.action} <ArrowRight />
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Donor Wall */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
                Community Heroes
              </span>
              <h2 className="mt-2 font-display text-3xl font-black sm:text-4xl">
                Recent Supporters Wall
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Thank you to our compassionate community for making every rescue possible.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sampleDonors.map((donor, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-foreground">{donor.name}</span>
                  <Badge variant="secondary">{donor.amount}</Badge>
                </div>
                <p className="mt-2 text-xs italic text-muted-foreground">“{donor.note}”</p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="font-semibold text-teal">{donor.type}</span>
                  <span>{donor.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation FAQ */}
      <section className="border-t bg-secondary/50 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
              Common Inquiries
            </span>
            <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">Donation FAQs</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Learn more about how funds are managed, security standards, and tax-deduction
              policies.
            </p>
          </div>

          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {donateFaqs.map((faq, index) => (
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

      {/* Final Call to Action */}
      <section className="px-5 pb-20 pt-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-ink px-6 py-16 text-center text-ink-foreground sm:px-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-soft px-4 py-1.5 text-xs font-extrabold uppercase text-primary">
            <Heart className="size-3.5 fill-current" />
            Together We Make A Difference
          </span>
          <h2 className="mt-6 font-display text-4xl font-black sm:text-5xl">
            Want to Open Your Home Instead?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Explore our adoptable pets waiting for a loving family, or learn more about how our
            adoption process works.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/pets">
                Meet Adoptable Pets <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="footer">
              <Link to="/how-it-works">How Adoption Works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-teal text-teal-foreground">
              <Check className="size-8" />
            </div>
            <DialogTitle className="mt-4 font-display text-2xl font-bold">
              Thank You for Your Kindness!
            </DialogTitle>
            <DialogDescription className="text-sm">
              Your demo donation of{" "}
              <strong className="text-foreground">
                ₹{activeAmount ? activeAmount.toLocaleString("en-IN") : 0}{" "}
                {frequency === "monthly" ? "monthly" : "one-time"}
              </strong>{" "}
              helps ensure vulnerable rescue animals receive immediate medical vetting and
              nourishing meals.
            </DialogDescription>
          </DialogHeader>
          <div className="my-3 rounded-2xl bg-secondary p-4 text-xs text-muted-foreground">
            <p className="font-bold text-foreground">DEMO ACKNOWLEDGEMENT</p>
            <p className="mt-1">
              This is a demonstration interface. No real financial transaction was processed.
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <Button onClick={() => setShowSuccessDialog(false)}>Close</Button>
            <Button asChild variant="outline">
              <Link to="/pets">Browse Pets</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
