import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/cafe-pages";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | À Votre Santé Café" },
      { name: "description", content: "Find À Votre Santé Café at Nahar Optionz Shopping Plaza, opposite D Mart in Chandivali, Mumbai." },
      { property: "og:title", content: "About | À Votre Santé Café" },
      { property: "og:description", content: "A neighbourhood café in Chandivali, Mumbai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});