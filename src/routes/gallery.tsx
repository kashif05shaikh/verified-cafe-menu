import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/cafe-pages";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | À Votre Santé Café" },
      { name: "description", content: "A small collection of café photos from the public listing for À Votre Santé Café in Chandivali, Mumbai." },
      { property: "og:title", content: "Gallery | À Votre Santé Café" },
      { property: "og:description", content: "A glimpse inside À Votre Santé Café, Chandivali." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});