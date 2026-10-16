import { createFileRoute } from "@tanstack/react-router";
import { MenuPage } from "@/components/cafe-pages";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | À Votre Santé Café" },
      { name: "description", content: "Browse the publicly listed vegetarian food and drink menu for À Votre Santé Café in Chandivali." },
      { property: "og:title", content: "Menu | À Votre Santé Café" },
      { property: "og:description", content: "Browse listed dishes, drinks and prices from À Votre Santé Café." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});