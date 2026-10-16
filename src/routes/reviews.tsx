import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage } from "@/components/cafe-pages";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Ratings & Reviews | À Votre Santé Café" },
      { name: "description", content: "Source-attributed public ratings for À Votre Santé Café in Chandivali, Mumbai." },
      { property: "og:title", content: "Ratings & Reviews | À Votre Santé Café" },
      { property: "og:description", content: "See public ratings with their original listing sources." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewsPage,
});