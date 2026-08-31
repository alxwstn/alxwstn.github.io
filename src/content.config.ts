// see: https://docs.astro.build/en/guides/content-collections/
import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

// Define a `loader` and `schema` for each collection
const category = defineCollection({
  loader: glob({ base: "./src/content/category", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tag: z.string(),
      image: image(),
      imageAlt: z.string(),
      priority: z.number(),
    }),
});

const project = defineCollection({
  loader: glob({ base: "./src/content/project", pattern: "**/*.json" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      organization: z.string(),
      location: z.string(),
      categories: z.array(z.string()),
      description: z.string(),
      duties: z.array(z.string()),
      images: z.array(z.object({ src: image(), alt: z.string() })),
      priority: z.number(),
    }),
});

// Export a single `collections` object to register collection(s)
export const collections = { category, project };
