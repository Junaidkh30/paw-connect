import { Link } from "@tanstack/react-router";
import {
  Heart,
  Menu,
  Moon,
  PawPrint,
  Sun,
  X,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  User as UserIcon,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/app-context";
import { useAuth } from "@/context/auth-context";

const links = [
  { to: "/", label: "Home" },
  { to: "/pets", label: "Find a Pet" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/donate", label: "Donate" },
  { to: "/about", label: "About Us" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { favorites, theme, toggleTheme } = useApp();
  const { user, openAuthModal, signOutUser } = useAuth();

  const userInitials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email
      ? user.email.slice(0, 2).toUpperCase()
      : "U";

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 lg:flex lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2 font-display text-xl font-black">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-warm">
            <PawPrint />
          </span>
          <span className="hidden sm:inline">
            Paw<span className="text-primary">Connect</span>
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary font-bold text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </Button>

          {/* Saved Favorites */}
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/favorites" aria-label={`${favorites.length} favorite pets`}>
              <Heart className="size-5" />
              <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {favorites.length}
              </span>
            </Link>
          </Button>

          {/* User Auth Profile / Sign In */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative size-9 rounded-full p-0 ring-offset-background transition-all hover:ring-2 hover:ring-primary focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Avatar className="size-9 border border-border">
                    <AvatarImage
                      src={user.photoURL || undefined}
                      alt={user.displayName || "User"}
                    />
                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">
                      {user.displayName || "Adopter"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/favorites" className="flex items-center gap-2 cursor-pointer">
                    <Heart className="size-4 text-primary" />
                    <span>My Saved Pets</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOutUser()}
                  className="text-destructive focus:text-destructive cursor-pointer flex items-center gap-2"
                >
                  <LogOut className="size-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                openAuthModal(
                  "Sign in to save your favorite pets and submit adoption applications.",
                )
              }
              className="gap-1.5 font-bold"
            >
              <UserIcon className="size-4" />
              <span>Sign In</span>
            </Button>
          )}

          <Button asChild className="hidden sm:inline-flex">
            <Link to="/pets">Adopt a Pet</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="animate-in slide-in-from-top-2 border-t border-border p-4 lg:hidden bg-background">
          <div className="space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 font-semibold hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {!user && (
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="default"
                className="w-full font-bold gap-2"
                onClick={() => {
                  setOpen(false);
                  openAuthModal("Sign in to adopt pets and track your applications.");
                }}
              >
                <UserIcon className="size-4" />
                Sign In / Register
              </Button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-display text-2xl font-black">
            <PawPrint className="text-primary" />
            PawConnect
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-ink-muted">
            Connecting rescue companion animals with loving forever families. Every pet deserves a
            safe home, proper healthcare, and lifelong dignity.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-ink-border px-3 py-1 text-xs font-bold text-ink-muted">
            <Heart className="size-3 text-primary fill-current" />
            Non-Profit Animal Welfare Initiative
          </span>
        </div>

        <div>
          <h3 className="font-bold">Explore</h3>
          <div className="mt-4 grid gap-2 text-sm text-ink-muted">
            <Link to="/pets" className="hover:text-primary transition-colors">
              Find a Pet
            </Link>
            <Link to="/how-it-works" className="hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link to="/success-stories" className="hover:text-primary transition-colors">
              Success Stories
            </Link>
            <Link to="/donate" className="hover:text-primary transition-colors">
              Donate & Support
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Stay connected</h3>
          <a
            href="mailto:junaidstudy123@gmail.com"
            className="mt-4 flex items-center gap-2 text-sm text-ink-muted hover:text-primary transition-colors"
          >
            <Mail className="size-4 text-primary shrink-0" />
            junaidstudy123@gmail.com
          </a>
          <p className="mt-2 text-xs text-ink-muted/80">Volunteer & adoption desk helpline</p>
          <div className="mt-4 flex gap-2">
            <Button variant="footer" size="icon" aria-label="Instagram">
              <Instagram />
            </Button>
            <Button variant="footer" size="icon" aria-label="Facebook">
              <Facebook />
            </Button>
            <Button variant="footer" size="icon" aria-label="YouTube">
              <Youtube />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>© 2026 PawConnect. All rights reserved.</p>
          <p>Privacy Policy · Terms of Use · Animal Welfare Pledge</p>
        </div>
      </div>
    </footer>
  );
}
