export interface Freshness {
  tier: 'molten' | 'glowing' | 'tempered' | 'forged';
  label: string;
}

export function getFreshness(date: Date): Freshness {
  const now = new Date();
  const days = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (days < 14) return { tier: 'molten', label: 'Molten' };
  if (days < 60) return { tier: 'glowing', label: 'Glowing' };
  if (days < 180) return { tier: 'tempered', label: 'Tempered' };
  return { tier: 'forged', label: 'Forged' };
}
