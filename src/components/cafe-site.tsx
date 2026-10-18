import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu as MenuIcon, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cafe } from "@/lib/cafe-data";

const pages = [
  { label: "Home", to: "/" as const },
  { label: "Menu", to: "/menu" as const },
  { label: "Gallery", to: "/gallery" as const },
  { label: "About", to: "/about" as const },
  { label: "Reviews", to: "/reviews" as const },
  { label: "Visit", to: "/visit" as const },
];

function ThemeControl() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem("avs-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const value = saved === "dark" || (saved !== "light" && prefersDark);
    document.documentElement.classList.toggle("dark", value);
    setDark(value);
  }, []);
  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("avs-theme", next ? "dark" : "light");
    setDark(next);
  };
  return (
    <Button variant="ghost" size="icon" className="text-foreground" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`} title={`Switch to ${dark ? "light" : "dark"} theme`}>
      {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}

export function CafeNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMobileOpen(false), [location.pathname]);
  return (
    <header className="cafe-nav cafe-glass">
      <div className="cafe-container flex min-h-16 items-center justify-between gap-4">
        <Link to="/" className="cafe-link flex min-w-0 items-center gap-2 text-foreground no-underline" aria-label={`${cafe.name} home`}>
          <span className="cafe-serif text-2xl leading-none">ÀVS</span>
          <span className="hidden text-xs tracking-wide sm:inline">À Votre Santé Café</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {pages.map((page) => (
            <Link key={page.to} to={page.to} className={`cafe-link text-sm ${location.pathname === page.to ? "text-primary" : "text-muted-foreground"}`} aria-current={location.pathname === page.to ? "page" : undefined}>{page.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeControl />
          <Button asChild size="sm" className="hidden sm:inline-flex"><Link to="/visit">Reserve <ArrowUpRight aria-hidden="true" /></Link></Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
            {mobileOpen ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
          </Button>
        </div>
      </div>
      {mobileOpen && <nav className="cafe-container grid gap-1 border-t border-border py-4 lg:hidden" aria-label="Mobile navigation">
        {pages.map((page, index) => <Link key={page.to} to={page.to} className="cafe-serif cafe-reveal border-b border-border py-3 text-3xl" style={{ animationDelay: `${index * 45}ms` }}>{page.label}</Link>)}
        <Button asChild className="mt-3"><Link to="/visit">Reserve a table <ArrowUpRight aria-hidden="true" /></Link></Button>
      </nav>}
    </header>
  );
}

export function CafeFooter() {
  return <footer className="cafe-footer mt-16">
    <div className="cafe-container grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end">
      <div><p className="cafe-eyebrow">Chandivali · Mumbai</p><p className="cafe-serif mt-2 text-3xl">À Votre Santé Café</p><p className="mt-2 max-w-lg text-sm text-muted-foreground">Coffee, food and a neighbourhood table, near D Mart.</p></div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm"><Link className="cafe-link" to="/menu">Menu</Link><Link className="cafe-link" to="/gallery">Gallery</Link><Link className="cafe-link" to="/visit">Visit</Link><a className="cafe-link inline-flex items-center gap-1" href={cafe.zomatoUrl} target="_blank" rel="noreferrer">Zomato <ArrowUpRight aria-hidden="true" className="size-3" /></a></div>
      <p className="text-xs text-muted-foreground md:col-span-2">Details and menu prices are reproduced from public listings and may change.</p>
    </div>
  </footer>;
}

export function CafePage({ children }: { children: ReactNode }) {
  return <div className="cafe-page"><CafeNav /><main>{children}</main><CafeFooter /></div>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <header className="cafe-container cafe-section cafe-reveal pb-10"><p className="cafe-eyebrow">{eyebrow}</p><h1 className="cafe-serif mt-4 max-w-5xl text-6xl leading-[.96] md:text-8xl">{title}</h1>{description && <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{description}</p>}</header>;
}