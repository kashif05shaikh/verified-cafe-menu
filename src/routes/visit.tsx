import { createFileRoute } from "@tanstack/react-router";
import { VisitPage } from "@/components/cafe-pages";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit | À Votre Santé Café, Chandivali" },
      { name: "description", content: "Find the café’s listed address and hours, get directions, or send a table enquiry to À Votre Santé Café." },
      { property: "og:title", content: "Visit | À Votre Santé Café, Chandivali" },
      { property: "og:description", content: "Plan a visit to À Votre Santé Café in Chandivali, Mumbai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VisitPage,
});