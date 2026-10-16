import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/cafe-pages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "À Votre Santé Café | Chandivali, Mumbai" },
      { name: "description", content: "Coffee, vegetarian food and a neighbourhood table at À Votre Santé Café in Chandivali, Mumbai." },
      { property: "og:title", content: "À Votre Santé Café | Chandivali, Mumbai" },
      { property: "og:description", content: "Coffee, vegetarian food and a neighbourhood table in Chandivali, Mumbai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});