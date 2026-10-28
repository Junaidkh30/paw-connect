import { useState, useEffect } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PawPrint,
  HeartHandshake,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { db } from "@/lib/firebase";

export type Form = {
  name: string;
  email: string;
  phone: string;
  city: string;
  housing: string;
  tenure: string;
  otherPets: string;
  children: string;
  motivation: string;
  experience: string;
  availability: string;
};

export type AdoptionFormData = Form;

export function validateAdoptionForm(step: number, form: Form): string[] {
  const required =
    step === 1
      ? ["name", "email", "phone", "city"]
      : step === 2
        ? ["housing", "tenure", "otherPets", "children"]
        : ["motivation", "experience", "availability"];

  const missing = required.filter((k) => !form[k as keyof Form].trim());

  if (step === 1 && !/^\S+@\S+\.\S+$/.test(form.email)) {
    missing.push("valid email");
  }

  return missing;
}

const initial: Form = {
  name: "",
  email: "",
  phone: "",
  city: "",
  housing: "Apartment",
  tenure: "Own",
  otherPets: "None",
  children: "No",
  motivation: "",
  experience: "",
  availability: "",
};

export function AdoptionForm({
  open,
  onOpenChange,
  petName,
  petId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  petName: string;
  petId?: number;
}) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(initial);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [applicationId, setApplicationId] = useState<string>("");

  // Pre-fill user information if authenticated
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.displayName || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user, open]);

  const update = (key: keyof Form, value: string) => setForm((v) => ({ ...v, [key]: value }));

  const next = () => {
    const missing = validateAdoptionForm(step, form);

    setErrors(missing);
    if (!missing.length) {
      setStep((v) => Math.min(4, v + 1));
    }
  };

  const handleSubmitApplication = async () => {
    setSubmitting(true);
    try {
      // Save application directly to Firestore
      const docRef = await addDoc(collection(db, "applications"), {
        userId: user?.uid || "guest",
        applicantName: form.name,
        applicantEmail: form.email,
        phone: form.phone,
        city: form.city,
        petName,
        petId: petId || null,
        housing: form.housing,
        tenure: form.tenure,
        otherPets: form.otherPets,
        children: form.children,
        motivation: form.motivation,
        experience: form.experience,
        availability: form.availability,
        status: "Pending Review",
        createdAt: serverTimestamp(),
      });

      setApplicationId(docRef.id);
      setDone(true);
      toast.success(`Application submitted for ${petName}!`);
    } catch (err) {
      console.error("Firestore application submission error:", err);
      toast.error(
        "Could not save application to Firestore. Please check your connection and try again.",
      );
      setDone(false);
    } finally {
      setSubmitting(false);
    }
  };

  const close = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      setTimeout(() => {
        setStep(1);
        setDone(false);
        setErrors([]);
        setApplicationId("");
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl p-6">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
              <PawPrint className="size-3.5" /> Official Adoption Form
            </span>
            {user && (
              <span className="inline-flex items-center gap-1 rounded-full bg-teal/15 px-3 py-1 text-xs font-bold text-teal">
                <ShieldCheck className="size-3.5" /> Verified User
              </span>
            )}
          </div>
          <DialogTitle className="font-display text-2xl sm:text-3xl font-black">
            Adopt {petName}
          </DialogTitle>
          <DialogDescription className="text-sm">
            Tell us about yourself. This is a demonstration project, so your details are saved but
            no shelter will contact you.
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-teal text-teal-foreground shadow-lg animate-in zoom-in">
              <Check className="size-10" />
            </div>
            <div>
              <h3 className="font-display text-3xl font-black">Application Received!</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                Thank you, <strong>{form.name}</strong>. Your adoption request for{" "}
                <strong>{petName}</strong> has been logged in Firestore.
              </p>
            </div>

            <div className="rounded-2xl border bg-secondary/50 p-4 max-w-sm mx-auto text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Firestore Document ID:</span>
                <span className="font-mono font-bold text-primary">{applicationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pet:</span>
                <span className="font-bold">{petName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Applicant Email:</span>
                <span className="font-medium">{form.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-bold text-teal">Pending Review</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Note: This application has been stored in Firestore for demonstration and academic
              evaluation. No live coordinator review workflow is scheduled.
            </p>

            <Button className="mt-4 px-8 font-bold" onClick={() => close(false)}>
              Back to Pet Profile
            </Button>
          </div>
        ) : (
          <>
            {/* Step Progress Bar */}
            <div className="grid grid-cols-4 gap-2 my-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="space-y-1.5">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      n <= step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  <span className="block text-[11px] font-bold text-muted-foreground text-center sm:text-left">
                    {n === 1
                      ? "1. You"
                      : n === 2
                        ? "2. Home"
                        : n === 3
                          ? "3. Lifestyle"
                          : "4. Review"}
                  </span>
                </div>
              ))}
            </div>

            {/* Form Steps */}
            <div className="min-h-72 py-3">
              {/* Step 1: Contact Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="app-name">Full Name *</Label>
                      <Input
                        id="app-name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="app-email">Email Address *</Label>
                      <Input
                        id="app-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="app-phone">Phone Number *</Label>
                      <Input
                        id="app-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="app-city">City / Location *</Label>
                      <Input
                        id="app-city"
                        placeholder="e.g. Mumbai, Bengaluru"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Living Environment */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="app-housing">Housing Type *</Label>
                      <Input
                        id="app-housing"
                        placeholder="Apartment, Independent House, Villa"
                        value={form.housing}
                        onChange={(e) => update("housing", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="app-tenure">Home Ownership *</Label>
                      <Input
                        id="app-tenure"
                        placeholder="Own / Rent (with landlord pet permission)"
                        value={form.tenure}
                        onChange={(e) => update("tenure", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="app-other-pets">Current Pets at Home *</Label>
                      <Input
                        id="app-other-pets"
                        placeholder="None / 1 dog / 2 cats"
                        value={form.otherPets}
                        onChange={(e) => update("otherPets", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="app-children">Children in Household *</Label>
                      <Input
                        id="app-children"
                        placeholder="No / Yes (ages)"
                        value={form.children}
                        onChange={(e) => update("children", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Motivation & Experience */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="app-motivation">Why would you like to adopt {petName}? *</Label>
                    <Textarea
                      id="app-motivation"
                      rows={3}
                      placeholder="Tell us about your home routine and why this pet is the right match..."
                      value={form.motivation}
                      onChange={(e) => update("motivation", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="app-experience">Previous Pet Experience *</Label>
                      <Textarea
                        id="app-experience"
                        rows={2}
                        placeholder="First-time owner / lifelong pet parent..."
                        value={form.experience}
                        onChange={(e) => update("experience", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="app-availability">Daily Time / Exercise *</Label>
                      <Textarea
                        id="app-availability"
                        rows={2}
                        placeholder="How many hours per day can you spend together?"
                        value={form.availability}
                        onChange={(e) => update("availability", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Summary Review */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="rounded-2xl border bg-secondary/40 p-5">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
                      <FileCheck className="size-4" /> Application Summary
                    </div>
                    <dl className="grid gap-3 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-xs uppercase font-bold text-muted-foreground">
                          Applicant
                        </dt>
                        <dd className="font-bold text-foreground">{form.name}</dd>
                        <dd className="text-xs text-muted-foreground">{form.email}</dd>
                        <dd className="text-xs text-muted-foreground">{form.phone}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase font-bold text-muted-foreground">
                          Target Companion
                        </dt>
                        <dd className="font-bold text-foreground">{petName}</dd>
                        <dd className="text-xs text-muted-foreground">City: {form.city}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase font-bold text-muted-foreground">
                          Living Setup
                        </dt>
                        <dd className="font-medium text-foreground">
                          {form.housing} ({form.tenure})
                        </dd>
                        <dd className="text-xs text-muted-foreground">
                          Pets: {form.otherPets} · Kids: {form.children}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase font-bold text-muted-foreground">
                          Daily Commitment
                        </dt>
                        <dd className="font-medium text-foreground truncate">
                          {form.availability || "Standard daily care"}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <HeartHandshake className="size-4 text-teal shrink-0" />
                    By submitting, you confirm all details provided are true and agree to our
                    meet-and-greet policy.
                  </p>
                </div>
              )}
            </div>

            {/* Validation Errors Alert */}
            {errors.length > 0 && (
              <p className="text-xs font-bold text-destructive bg-destructive/10 rounded-lg p-2.5">
                Please complete all required fields ({errors.join(", ")}) before proceeding.
              </p>
            )}

            {/* Modal Controls */}
            <div className="flex items-center justify-between border-t pt-4">
              <Button
                variant="outline"
                disabled={step === 1 || submitting}
                onClick={() => setStep((v) => v - 1)}
                className="gap-1.5"
              >
                <ChevronLeft className="size-4" /> Back
              </Button>

              {step < 4 ? (
                <Button onClick={next} className="gap-1.5 font-bold shadow-warm">
                  Continue <ChevronRight className="size-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitApplication}
                  disabled={submitting}
                  className="font-bold shadow-warm gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="size-4" /> Submit Application
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
