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
  {
    title: 'Prism',
    description: 'A gallery and workbench that runs one prompt across flagship models, aligns their outputs, and surfaces meaningful differences.',
    githubUrl: 'https://github.com/The-CarL/prism',
    language: 'TypeScript',
    topics: ['LLM Comparison', 'Output Diffing', 'BYO Keys'],
  },
  {
    title: 'LLM Lifecycle / Crucible',
    description: 'An interactive visualization of the full LLM lifecycle, replaying real training runs from initialization through pre-training, SFT, reinforcement learning, and inference.',
    githubUrl: 'https://github.com/The-CarL/llm-lifecycle',
    language: 'Python',
    topics: ['LLM Training', 'Reinforcement Learning', 'Visualization'],
  },
  {
    title: 'SkyTunnel',
    description: 'A self-hosted toolkit that deploys DNS, ICMP, and HTTPS tunnels on EC2 for resilient connectivity in restricted networks.',
    githubUrl: 'https://github.com/The-CarL/SkyTunnel',
    language: 'Shell',
    topics: ['DNS / ICMP / HTTPS', 'AWS CloudFormation', 'SOCKS5'],
  },
  {
    title: 'OpenAI Cookbook Sandbox',
    description: 'Ordered, runnable exercises for studying the OpenAI API stack, from Responses and built-in tools to retrieval, agents, and production patterns.',
    githubUrl: 'https://github.com/The-CarL/openai-cookbook-sandbox',
    language: 'Jupyter Notebook',
    topics: ['OpenAI API', 'Responses API', 'Agents SDK'],
  },
  {
    title: 'Text2SQL Perf Bench',
    description: "A local benchmark harness for measuring generated SQL's end-to-end runtime across query-complexity levels and context strategies, using OpenAI models for generation.",
    githubUrl: 'https://github.com/The-CarL/text2sql-perf-bench',
    topics: ['SQL', 'Benchmarking', 'OpenAI'],
  },
];
