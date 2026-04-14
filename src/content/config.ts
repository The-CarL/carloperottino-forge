import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    collaborators: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    comingSoon: z.boolean().default(false),
    thumbnail: z.string().optional(),
    heroImage: z.string().optional(),
    links: z.object({
      live: z.string().url().optional(),
      github: z.string().url().optional(),
      blog: z.string().url().optional(),
    }).default({}),
  }),
});

export const collections = { projects };
