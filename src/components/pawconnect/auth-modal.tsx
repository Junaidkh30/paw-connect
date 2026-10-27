import { useState } from "react";
import { Lock, Mail, PawPrint, User as UserIcon, Loader2, Sparkles } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";

export function AuthModal() {
  const {
    authModalOpen,
    closeAuthModal,
    authModalReason,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up state
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch {
      // Error is toasted in context
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim() || !signInPassword) return;

    try {
      setLoading(true);
      await signInWithEmail(signInEmail.trim(), signInPassword);
    } catch {
      // Error handled in context
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError("");

    if (!signUpName.trim()) {
      setSignUpError("Please enter your full name.");
      return;
    }
    if (!signUpEmail.trim()) {
      setSignUpError("Please enter your email.");
      return;
    }
    if (signUpPassword.length < 6) {
      setSignUpError("Password must be at least 6 characters long.");
      return;
    }
    if (signUpPassword !== confirmPassword) {
      setSignUpError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await signUpWithEmail(signUpEmail.trim(), signUpPassword, signUpName.trim());
    } catch {
      // Error handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={authModalOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <DialogContent className="overflow-hidden sm:max-w-md p-0 border-border/80 shadow-2xl">
        <div className="bg-gradient-to-br from-primary/15 via-background to-secondary/40 p-6 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-warm">
              <PawPrint className="size-5" />
            </span>
            <span className="font-display font-black text-xl">
              Paw<span className="text-primary">Connect</span>
            </span>
          </div>

          <DialogHeader className="mt-4 text-left">
            <DialogTitle className="font-display text-2xl font-black">
              Account Required to Adopt
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-foreground/80 flex items-start gap-1.5 font-medium">
              <Sparkles className="size-4 text-teal shrink-0 mt-0.5" />
              {authModalReason}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 pt-4 space-y-5">
          {/* Quick Google Sign In */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-3 font-bold border-border/80 hover:bg-secondary/70 h-11"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <svg className="size-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-border" />
            <span className="absolute bg-background px-3 text-xs font-semibold uppercase text-muted-foreground">
              Or with email
            </span>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v as "signin" | "signup");
              setSignUpError("");
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin" className="font-bold">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="font-bold">
                Create Account
              </TabsTrigger>
            </TabsList>

            {/* Sign In Form */}
            <TabsContent value="signin" className="mt-4 space-y-4">
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signin-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-9"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-bold shadow-warm"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In to Continue"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup" className="mt-4 space-y-4">
              <form onSubmit={handleEmailSignUp} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Jane Doe"
                      className="pl-9"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="signup-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-9"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••"
                        className="pl-9 text-sm"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="confirm-password">Confirm</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••"
                      className="text-sm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {signUpError && (
                  <p className="text-xs font-semibold text-destructive">{signUpError}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-bold shadow-warm mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account & Continue"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to PawConnect’s Adoption Safety & Animal Welfare Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
