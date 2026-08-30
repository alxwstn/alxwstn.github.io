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
    }),
});

// Export a single `collections` object to register collection(s)
export const collections = { category };
