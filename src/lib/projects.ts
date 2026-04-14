import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export function getProjectSlug(project: Project): string {
  return project.id;
}

export async function getPublishedProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });
  return projects.sort((a, b) => {
    // Featured first
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    // Then by most recently updated
    const aDate = a.data.updatedDate ?? a.data.date;
    const bDate = b.data.updatedDate ?? b.data.date;
    return bDate.valueOf() - aDate.valueOf();
  });
}

export async function getAllProjectTags(): Promise<Map<string, number>> {
  const projects = await getPublishedProjects();
  const tagMap = new Map<string, number>();
  for (const project of projects) {
    for (const tag of project.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  return tagMap;
}
