import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Image, MapPin, Search, Star, Utensils, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CafePage, PageIntro } from "@/components/cafe-site";
import { allMenuItems, cafe, categories, formatHours, getCafeOpenStatus, hours, photos } from "@/lib/cafe-data";

function CafeImage({ photo, className = "", priority = false }: { photo: (typeof photos)[number]; className?: string; priority?: boolean }) {
  return <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} className={`cafe-image ${className}`} />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="cafe-eyebrow">{children}</p>;
}

function SmallArrow() {
  return <ArrowUpRight aria-hidden="true" className="size-4" />;
}

export function HomePage() {
  const heroPhoto = photos[0];
  const counterPhoto = photos[1];
  const drinkPhoto = photos[3];
  const featureCategories = ["avs-special-coffee", "pizza-pasta", "soups-salads"];
  const featured = featureCategories.flatMap((id) => categories.find((category) => category.id === id)?.items.slice(0, 2) ?? []);
  const cafeSchema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: cafe.name,
    address: { "@type": "PostalAddress", streetAddress: cafe.address, addressLocality: "Mumbai", addressRegion: "Maharashtra", postalCode: "400072", addressCountry: "IN" },
    geo: { "@type": "GeoCoordinates", latitude: cafe.coordinates.latitude, longitude: cafe.coordinates.longitude },
    telephone: cafe.phone,
    openingHours: ["Mo-Fr 08:30-01:00", "Sa-Su 08:00-01:00"],
    hasMap: cafe.mapsUrl,
    image: photos.map((photo) => photo.src),
    servesCuisine: ["Vegetarian", "Cafe", "Coffee", "Chinese", "Continental"],
  };
  return <CafePage>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cafeSchema) }} />
    <section className="cafe-container grid gap-8 pb-16 pt-12 md:grid-cols-[.9fr_1.1fr] md:items-end md:pb-20 md:pt-16">
      <div className="cafe-reveal flex flex-col items-start">
        <SectionLabel>Neighbourhood café · Chandivali, Mumbai</SectionLabel>
        <h1 className="cafe-display mt-7 max-w-3xl">À Votre<br /><span className="italic">Santé</span> Café</h1>
        <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">A café table for coffee, something good to eat, and a little time in Chandivali.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild><Link to="/menu">Explore the menu <SmallArrow /></Link></Button><Button asChild variant="outline"><Link to="/visit">Find us <MapPin aria-hidden="true" /></Link></Button></div>
        <div className="mt-12 flex items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground"><MapPin className="size-4" aria-hidden="true" /><span>Near D Mart · Chandivali</span><span aria-hidden="true">·</span><a className="cafe-link" href={cafe.mapsUrl} target="_blank" rel="noreferrer">Get directions</a></div>
      </div>
      <figure className="cafe-image-frame cafe-film relative aspect-[1.25/1] overflow-hidden sm:aspect-[1.4/1] md:aspect-[1.1/1]">
        <CafeImage photo={heroPhoto} priority />
        <figcaption className="absolute bottom-4 left-4 z-10 bg-background/90 px-3 py-2 text-xs">A table at À Votre Santé</figcaption>
      </figure>
    </section>
    <div className="overflow-hidden border-y border-border py-4" aria-label="Café menu highlights">
      <div className="cafe-marquee flex w-max gap-8 whitespace-nowrap text-xs uppercase tracking-[.12em] text-muted-foreground">{Array.from({ length: 2 }).map((_, index) => <span key={index} className="flex gap-8">{["Coffee, slowly", "A table in Chandivali", "Vegetarian menu listing", "À Votre Santé"].map((text) => <span key={text}>{text}<span className="ml-8 text-primary" aria-hidden="true">✳</span></span>)}</span>)}</div>
    </div>
    <section className="cafe-container cafe-section grid gap-12 md:grid-cols-[.72fr_1fr] md:items-center">
      <div className="cafe-image-frame relative aspect-[4/5] max-w-md overflow-hidden md:justify-self-end"><CafeImage photo={counterPhoto} /><span className="absolute bottom-4 left-4 bg-background/90 px-3 py-2 text-xs">The espresso counter</span></div>
      <div className="max-w-xl md:pl-8"><SectionLabel>A neighbourhood table</SectionLabel><h2 className="cafe-serif mt-5 text-5xl leading-[1.02] md:text-7xl">A little corner of Chandivali.</h2><p className="mt-6 text-base leading-7 text-muted-foreground">Find À Votre Santé Café at Nahar Optionz Shopping Plaza, opposite D Mart. Public listings describe a vegetarian menu with coffee, continental and Chinese dishes.</p><Button asChild variant="link" className="mt-5 h-auto p-0 text-foreground"><Link to="/about">A little more about the café <SmallArrow /></Link></Button></div>
    </section>
    <section className="bg-secondary/70 py-5">
      <div className="cafe-container flex items-center justify-between gap-8"><div><SectionLabel>From the online menu</SectionLabel><p className="mt-1 text-sm text-muted-foreground">A few listed favourites, with prices shown by Zomato.</p></div><Button asChild variant="link" className="shrink-0"><Link to="/menu">See all sections <SmallArrow /></Link></Button></div>
      <div className="cafe-container mt-7 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">{featured.map((item, index) => <article key={item.name} className="border-t border-border p-4 sm:p-5"><p className="cafe-eyebrow">{["Coffee", "From the kitchen", "Something fresh"][index % 3]}</p><h3 className="cafe-serif mt-3 text-2xl">{item.name}</h3><p className="mt-3 text-sm text-muted-foreground">{item.desc || "A vegetarian choice from the online menu listing."}</p><p className="mt-4 text-sm font-medium">₹{item.price}</p></article>)}</div>
    </section>
    <section className="cafe-container cafe-section grid items-center gap-10 md:grid-cols-[1fr_.85fr]">
      <div><SectionLabel>A little taste of the place</SectionLabel><h2 className="cafe-serif mt-5 text-5xl leading-tight md:text-6xl">Coffee, croissants<br />and a familiar seat.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">Four photographs are currently available from the café’s public listing. Browse the small collection.</p><Button asChild variant="link" className="mt-3 h-auto p-0"><Link to="/gallery">Open the gallery <SmallArrow /></Link></Button></div>
      <div className="cafe-image-frame relative aspect-[1.2/1] overflow-hidden"><CafeImage photo={drinkPhoto} /><span className="absolute bottom-4 right-4 bg-background/90 px-3 py-2 text-xs">A café drink</span></div>
    </section>
    <section className="cafe-container pb-16">
      <div className="grid gap-8 border-t border-border py-8 md:grid-cols-3">
        <div className="flex gap-4"><Star className="mt-1 size-5 text-primary" aria-hidden="true" /><div><SectionLabel>Public ratings</SectionLabel><p className="cafe-serif mt-2 text-3xl">4.6 / 5</p><p className="mt-1 text-xs text-muted-foreground">Restaurant Guru listing · 296 reviews, reported there</p></div></div>
        <div className="flex gap-4"><Clock3 className="mt-1 size-5 text-primary" aria-hidden="true" /><div><SectionLabel>Most days, late</SectionLabel><p className="cafe-serif mt-2 text-3xl">8:30 am – 1 am</p><p className="mt-1 text-xs text-muted-foreground">Third-party reported hours; weekends open from 8 am.</p></div></div>
        <div className="flex gap-4"><MapPin className="mt-1 size-5 text-primary" aria-hidden="true" /><div><SectionLabel>Come by</SectionLabel><p className="cafe-serif mt-2 text-3xl">Chandivali</p><p className="mt-1 text-xs text-muted-foreground">Nahar Optionz Shopping Plaza, opposite D Mart.</p></div></div>
      </div>
      <div className="flex flex-wrap gap-3"><Button asChild><Link to="/visit">Plan your visit <SmallArrow /></Link></Button><Button asChild variant="outline"><a href={cafe.zomatoUrl} target="_blank" rel="noreferrer">View the Zomato listing <SmallArrow /></a></Button></div>
    </section>
  </CafePage>;
}

export function MenuPage() {
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${cafe.name} online menu listing`,
    hasMenuSection: categories.map((category) => ({ "@type": "MenuSection", name: category.name, hasMenuItem: category.items.map((item) => ({ "@type": "MenuItem", name: item.name, description: item.desc || undefined, offers: { "@type": "Offer", price: item.price, priceCurrency: "INR" } })) })),
  };
  const filtered = useMemo(() => categories.map((category) => ({ ...category, items: category.items.filter((item) => (!vegOnly || item.veg) && `${item.name} ${item.desc} ${category.name}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())) })).filter((category) => category.items.length > 0), [query, vegOnly]);
  useEffect(() => {
    const update = () => {
      const visible = [...document.querySelectorAll<HTMLElement>("[data-menu-category]")].find((node) => node.getBoundingClientRect().top > 0 && node.getBoundingClientRect().top < window.innerHeight * .52);
      if (visible?.dataset.menuCategory) setActiveCategory(visible.dataset.menuCategory);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [query, vegOnly]);
  const jumpTo = (id: string) => {
    setActiveCategory(id);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };
  return <CafePage>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }} />
    <PageIntro eyebrow="The online menu · INR" title="A little something for everyone." description="A transcription of the items and prices visible in the café’s Zomato online order listing. Availability and prices may change; this may not be the complete in-café menu." />
    <section className="cafe-container pb-8">
      <div className="flex flex-wrap items-center gap-4 border-y border-border py-4">
        <label className="relative min-w-[min(100%,17rem)] flex-1"><span className="sr-only">Search menu</span><Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes & drinks" /></label>
        <label className="flex items-center gap-2 text-sm"><Switch checked={vegOnly} onCheckedChange={setVegOnly} aria-label="Vegetarian items only" /><span>Vegetarian only</span></label>
        <Button variant="outline" onClick={() => window.print()}><Utensils aria-hidden="true" /> Print menu</Button>
        <span className="w-full text-xs text-muted-foreground sm:w-auto">{filtered.reduce((total, category) => total + category.items.length, 0)} listed items</span>
      </div>
      <nav className="no-print sticky top-16 z-20 -mx-4 flex gap-2 overflow-x-auto border-b border-border bg-background/95 px-4 py-3 backdrop-blur" aria-label="Menu categories">
        {categories.map((category) => <Button key={category.id} variant="ghost" size="sm" aria-current={activeCategory === category.id ? "true" : undefined} className="cafe-category-link shrink-0 border-b-2 border-transparent text-muted-foreground" onClick={() => jumpTo(category.id)}>{category.name}</Button>)}
      </nav>
      {filtered.length === 0 ? <div className="py-20 text-center"><Search className="mx-auto size-8 text-muted-foreground" aria-hidden="true" /><h2 className="cafe-serif mt-4 text-3xl">Nothing found</h2><p className="mt-2 text-sm text-muted-foreground">Try a different search.</p></div> : <div className="divide-y divide-border">{filtered.map((category, categoryIndex) => <section id={category.id} data-menu-category={category.id} key={category.id} className="scroll-mt-32 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="cafe-eyebrow">Section {String(categoryIndex + 1).padStart(2, "0")}</p><h2 className="cafe-serif mt-2 text-4xl md:text-5xl">{category.name}</h2></div><p className="max-w-sm text-right text-xs text-muted-foreground">{category.items.length} listed · {category.note}</p></div>
        <div className="grid gap-x-10 md:grid-cols-2">{category.items.map((item) => <article key={`${category.id}-${item.name}`} className="cafe-item py-4"><div className="flex items-start gap-3"><span className="mt-1.5 inline-flex size-3 shrink-0 items-center justify-center rounded-full border border-emerald-700" title="Listed as vegetarian"><span className="size-1.5 rounded-full bg-emerald-700" /></span><div className="min-w-0 flex-1"><div className="flex items-baseline justify-between gap-3"><h3 className="font-medium leading-6">{item.name}</h3><span className="shrink-0 text-sm tabular-nums">{item.price === null ? "Price not listed" : `₹${item.price}`}</span></div>{item.desc && <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.desc}</p>}</div></div></article>)}</div>
      </section>)}</div>}
      <p className="border-t border-border py-5 text-xs text-muted-foreground">Prices as shown in the Zomato online menu listing; they may change. All items are transcribed as vegetarian based on the listing’s “Vegetarian only” label. {allMenuItems.length} priced or described entries were extracted.</p>
    </section>
  </CafePage>;
}

export function GalleryPage() {
  const filters = ["All", "Food", "Drinks", "Interior"];
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const visiblePhotos = photos.filter((photo) => filter === "All" || photo.category === filter);
  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((current) => current === null ? null : (current + 1) % visiblePhotos.length);
      if (event.key === "ArrowLeft") setSelected((current) => current === null ? null : (current - 1 + visiblePhotos.length) % visiblePhotos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, visiblePhotos.length]);
  const currentPhoto = selected === null ? undefined : visiblePhotos[selected];
  return <CafePage>
    <PageIntro eyebrow="Four photos from the public listing" title="A glimpse inside." description="A small collection of photographs attributed to the café’s Zomato listing. The full Google Maps photo collection wasn’t available to verify." />
    <section className="cafe-container pb-16">
      <div className="mb-8 flex flex-wrap gap-2" aria-label="Gallery filters">{filters.map((item) => <Button key={item} size="sm" variant={filter === item ? "default" : "outline"} onClick={() => { setFilter(item); setSelected(null); }}>{item}</Button>)}</div>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">{visiblePhotos.map((photo, index) => <button key={photo.id} type="button" onClick={() => setSelected(index)} aria-label={`View ${photo.caption}`} className="cafe-image-frame cafe-focus mb-5 block w-full break-inside-avoid overflow-hidden text-left">
        <div className={index % 3 === 0 ? "aspect-[1.32/1]" : "aspect-[1/1]"}><CafeImage photo={photo} /></div><span className="block border-b border-border py-3"><span className="cafe-eyebrow">{photo.category}</span><span className="mt-1 block text-sm">{photo.caption}</span></span>
      </button>)}</div>
      <p className="mt-5 text-xs text-muted-foreground">More photos may be available on the <a className="cafe-link" href={cafe.photosUrl} target="_blank" rel="noreferrer">Zomato gallery <SmallArrow /></a>.</p>
    </section>
    {currentPhoto && <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setSelected(null)}>
      <Button variant="ghost" size="icon" className="absolute right-4 top-4 text-background" aria-label="Close photo viewer" onClick={() => setSelected(null)}><X /></Button>
      <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 text-background sm:left-8" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); setSelected((selectedIndex) => selectedIndex === null ? null : (selectedIndex - 1 + visiblePhotos.length) % visiblePhotos.length); }}><ArrowLeft /></Button>
      <figure className="max-h-[88vh] max-w-5xl" onClick={(event) => event.stopPropagation()}><img src={currentPhoto.src} alt={currentPhoto.alt} className="max-h-[78vh] w-auto max-w-full object-contain" /><figcaption className="mt-3 text-center text-sm text-background">{currentPhoto.caption} · {selected! + 1} / {visiblePhotos.length}</figcaption></figure>
      <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 text-background sm:right-8" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); setSelected((selectedIndex) => selectedIndex === null ? null : (selectedIndex + 1) % visiblePhotos.length); }}><ArrowRight /></Button>
    </div>}
  </CafePage>;
}

export function AboutPage() {
  const [hero, counter] = photos;
  const amenities = ["Indoor seating", "Outdoor seating", "Kid friendly", "Work friendly", "Books", "Artistic"];
  return <CafePage>
    <PageIntro eyebrow="About the café" title="A table in Chandivali." description="À Votre Santé Café is listed at Nahar Optionz Shopping Plaza, opposite D Mart. This page sticks to public listing details; no café history was verified." />
    <section className="cafe-container grid gap-10 pb-16 md:grid-cols-[1.1fr_.9fr] md:items-center">
      <figure className="cafe-image-frame relative aspect-[1.35/1] overflow-hidden"><CafeImage photo={hero} /><figcaption className="absolute bottom-4 left-4 bg-background/90 px-3 py-2 text-xs">Coffee and café plates</figcaption></figure>
      <div><SectionLabel>On the menu</SectionLabel><h2 className="cafe-serif mt-4 text-4xl md:text-5xl">Coffee, vegetarian plates, and something sweet.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">The public online listing includes coffee, tea, continental dishes, Chinese dishes, desserts and beverages. It describes the café as vegetarian-only; see the menu for listed item prices.</p><Button asChild variant="link" className="mt-3 h-auto p-0"><Link to="/menu">Browse the listed menu <SmallArrow /></Link></Button></div>
    </section>
    <section className="bg-secondary/60 py-12"><div className="cafe-container grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><SectionLabel>As listed online</SectionLabel><h2 className="cafe-serif mt-4 text-4xl">The setting, in their words.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Zomato lists indoor and outdoor seating, books, an artistic setting, and kid- and work-friendly options. These are listing details, not independently checked amenities.</p><div className="mt-5 flex flex-wrap gap-2">{amenities.map((label) => <span key={label} className="border border-border px-3 py-2 text-xs">{label}</span>)}</div></div><div className="cafe-image-frame relative aspect-[1.35/1] overflow-hidden"><CafeImage photo={counter} /></div></div></section>
    <section className="cafe-container py-12"><p className="cafe-eyebrow">Find us</p><p className="cafe-serif mt-3 text-3xl">Nahar Optionz Shopping Plaza<br />Chandivali, Mumbai 400072</p><p className="mt-3 text-sm text-muted-foreground">Opposite D Mart · <a className="cafe-link" href={cafe.mapsUrl} target="_blank" rel="noreferrer">Directions <SmallArrow /></a></p></section>
  </CafePage>;
}

export function ReviewsPage() {
  return <CafePage>
    <PageIntro eyebrow="Ratings & reviews" title="A note on the numbers." description="Ratings shown by public platforms. The count and score differ between listings; this is not a combined or independently verified figure." />
    <section className="cafe-container grid gap-0 border-y border-border md:grid-cols-3">
      <article className="border-b border-border py-8 md:border-b-0 md:border-r md:pr-8"><p className="cafe-eyebrow">Restaurant Guru · attributed to Google</p><p className="cafe-serif mt-4 text-6xl">4.6 <span className="text-2xl">/ 5</span></p><p className="mt-2 text-sm text-muted-foreground">296 reviews reported on Restaurant Guru.</p><a className="cafe-link mt-5 inline-flex items-center gap-1 text-sm" href="https://restaurant-guru.in/A-Votre-Sante-Cafe-Mumbai" target="_blank" rel="noreferrer">View source <SmallArrow /></a></article>
      <article className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8"><p className="cafe-eyebrow">Zomato · dining</p><p className="cafe-serif mt-4 text-6xl">4.3 <span className="text-2xl">/ 5</span></p><p className="mt-2 text-sm text-muted-foreground">102 dining ratings shown in the online listing.</p><a className="cafe-link mt-5 inline-flex items-center gap-1 text-sm" href={cafe.zomatoUrl} target="_blank" rel="noreferrer">View source <SmallArrow /></a></article>
      <article className="py-8 md:pl-8"><p className="cafe-eyebrow">Swiggy Dineout</p><p className="cafe-serif mt-4 text-6xl">4.6 <span className="text-2xl">/ 5</span></p><p className="mt-2 text-sm text-muted-foreground">315 ratings shown on the booking listing.</p><a className="cafe-link mt-5 inline-flex items-center gap-1 text-sm" href="https://www.swiggy.com/restaurants/mumbai/chandivali/a-votre-sante-cafe-1043949/dineout" target="_blank" rel="noreferrer">View source <SmallArrow /></a></article>
    </section>
    <section className="cafe-container py-14"><div className="max-w-2xl"><p className="cafe-eyebrow">Guest words</p><h2 className="cafe-serif mt-4 text-4xl">No quotes without a source.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Short review excerpts could not be verified from the public listings available for this page, so none are reproduced here. Read the original reviews on the listing.</p><Button asChild className="mt-5"><a href={cafe.mapsUrl} target="_blank" rel="noreferrer">Leave a review on Google <SmallArrow /></a></Button></div></section>
  </CafePage>;
}

export function VisitPage() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const open = now ? getCafeOpenStatus(now) : null;
  const currentDay = now ? new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", weekday: "long" }).format(now) : "";
  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [name, phone, date, time, guests] = ["name", "phone", "date", "time", "guests"].map((field) => String(data.get(field) ?? ""));
    const text = `Hello À Votre Santé Café, I'd like to enquire about a table. Name: ${name}. Phone: ${phone}. Date: ${date}. Time: ${time}. Guests: ${guests}.`;
    window.open(`https://wa.me/917400221263?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  return <CafePage>
    <PageIntro eyebrow="Find your way here" title="See you in Chandivali." description="À Votre Santé Café is at Nahar Optionz Shopping Plaza, opposite D Mart." />
    <section className="cafe-container grid gap-12 pb-16 lg:grid-cols-[.85fr_1.15fr]">
      <div>
        <div className="flex items-center gap-3 border-y border-border py-4"><span className={`size-2.5 rounded-full ${open ? "bg-emerald-700" : open === false ? "bg-destructive" : "bg-muted-foreground"}`} aria-hidden="true" /><p className="font-medium">{open === null ? "Checking hours" : open ? "Reported open now" : "Reported closed now"}</p><span className="text-xs text-muted-foreground">Asia/Kolkata</span></div>
        <div className="py-7"><SectionLabel>Opening hours · public listing</SectionLabel><div className="mt-4 divide-y divide-border">{hours.map((entry) => <div key={entry.day} className={`flex justify-between gap-4 py-3 text-sm ${entry.day === currentDay ? "font-semibold text-primary" : ""}`}><span>{entry.day}{entry.day === currentDay ? <span className="ml-2 text-xs font-normal">Today</span> : null}</span><span className="text-right">{formatHours(entry.open)} – 1:00 AM</span></div>)}</div><p className="mt-3 text-xs leading-5 text-muted-foreground">Hours are reported by a third-party listing; please confirm with the café before travelling.</p></div>
        <div className="border-t border-border py-6"><SectionLabel>Address</SectionLabel><p className="mt-3 max-w-lg leading-7">{cafe.address}</p><div className="mt-5 flex flex-wrap gap-3"><Button asChild><a href={cafe.mapsUrl} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /> Get directions</a></Button><Button asChild variant="outline"><a href={`tel:${cafe.phone}`}><ArrowUpRight aria-hidden="true" /> Call +91 74002 21263</a></Button></div></div>
        <div className="cafe-image-frame relative mt-3 aspect-[1.55/1] overflow-hidden"><iframe title="Map showing À Votre Santé Café in Chandivali, Mumbai" src={`https://maps.google.com/maps?q=${cafe.coordinates.latitude},${cafe.coordinates.longitude}&z=16&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0" /><a className="absolute bottom-3 right-3 z-10 bg-background/95 px-3 py-2 text-xs" href={cafe.mapsUrl} target="_blank" rel="noreferrer">Open in Maps <SmallArrow /></a></div>
      </div>
      <div className="h-fit bg-secondary/60 p-5 sm:p-8"><SectionLabel>A table enquiry</SectionLabel><h2 className="cafe-serif mt-3 text-4xl">Make a little plan.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">The details will open in a WhatsApp message to the café. Sending it does not guarantee a booking.</p>
        <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={submitEnquiry}>
          <label className="grid gap-2 text-sm">Name<Input name="name" autoComplete="name" required maxLength={80} /></label>
          <label className="grid gap-2 text-sm">Phone<Input name="phone" type="tel" autoComplete="tel" required maxLength={20} /></label>
          <label className="grid gap-2 text-sm">Date<Input name="date" type="date" required /></label>
          <label className="grid gap-2 text-sm">Time<Input name="time" type="time" required /></label>
          <label className="grid gap-2 text-sm sm:col-span-2">Guests<Input name="guests" type="number" min="1" max="20" defaultValue="2" required /></label>
          <Button type="submit" className="sm:col-span-2">Continue in WhatsApp <SmallArrow /></Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">The café’s WhatsApp number was not independently verified; this enquiry opens a message to the listed phone number.</p>
      </div>
    </section>
  </CafePage>;
}

export function CafeNotFound() {
  return <CafePage><section className="cafe-container cafe-section min-h-[60vh]"><p className="cafe-eyebrow">Page not found</p><h1 className="cafe-serif mt-4 text-7xl">A little detour.</h1><p className="mt-5 text-muted-foreground">That page isn’t here. Let’s find our way back.</p><Button asChild className="mt-7"><Link to="/">Return home <ArrowDown aria-hidden="true" /></Link></Button></section></CafePage>;
}