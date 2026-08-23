export interface ExternalProject {
  title: string;
  description: string;
  githubUrl: string;
  language?: string;
  topics?: string[];
}

export const externalProjects: ExternalProject[] = [
  {
    title: 'NetNudge',
    description: 'AI-powered contact management and personalized outreach for your professional network.',
    githubUrl: 'https://github.com/The-CarL/netnudge-mvp',
    language: 'Python',
    topics: ['AI Agents', 'Streamlit', 'Google Contacts'],
  },
  {
    title: 'Likeness Lab',
    description: 'A practical AWS workflow for training a personal likeness LoRA from a folder of photos.',
    githubUrl: 'https://github.com/The-CarL/likeness-lab',
    language: 'Python',
    topics: ['LoRA', 'Flux', 'AWS'],
  },
  {
    title: 'FutureBucks',
    description: 'A life-event-driven financial simulation tool for long-range scenarios and projections.',
    githubUrl: 'https://github.com/The-CarL/futurebucks',
    language: 'Python',
    topics: ['Finance', 'Simulation', 'Streamlit'],
  },
  {
    title: 'Transformer From Scratch',
    description: 'A weekend-sized, hands-on path to building and training a complete GPT from raw PyTorch operations.',
    githubUrl: 'https://github.com/The-CarL/transformer-from-scratch',
    language: 'Python',
    topics: ['LLMs', 'PyTorch', 'Education'],
  },
  {
    title: 'Perspectv',
    description: 'AI-powered competitive intelligence engine for generating personalized executive outreach messages in B2B sales.',
    githubUrl: 'https://github.com/The-CarL/perspectv',
    language: 'Python',
    topics: ['AI Agents', 'RAG', 'B2B Sales'],
  },
];
