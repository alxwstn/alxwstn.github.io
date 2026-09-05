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
      certs: z.array(z.string()).optional(),
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
      dateStr: z.string(),
      priority: z.number(),
    }),
});

const cert = defineCollection({
  loader: file("./src/content/cert.json"),
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    location: z.string(),
    date: z.coerce.date().optional(),
    priority: z.number(),
  }),
});
console.log(cert);

// Export a single `collections` object to register collection(s)
export const collections = { category, project, cert };
