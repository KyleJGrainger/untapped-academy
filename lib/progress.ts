// Simple localStorage-based progress tracking.
// For v1 this is fine; for a multi-device version, swap for a real DB.

const KEY = "untapped_academy_progress_v1";

export type Progress = {
  name?: string;
  email?: string;
  completed: string[]; // slugs of completed modules
  startedAt?: string;
  finishedAt?: string;
};

const empty: Progress = { completed: [] };

export function getProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { ...empty, startedAt: new Date().toISOString() };
  } catch {
    return empty;
  }
}

export function setProgress(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function markComplete(slug: string) {
  const p = getProgress();
  if (!p.completed.includes(slug)) {
    p.completed.push(slug);
    setProgress(p);
  }
}

export function isUnlocked(slug: string, allSlugs: string[]): boolean {
  const p = getProgress();
  const idx = allSlugs.indexOf(slug);
  if (idx === 0) return true;
  return p.completed.includes(allSlugs[idx - 1]);
}

export function isComplete(slug: string): boolean {
  return getProgress().completed.includes(slug);
}

export function setIdentity(name: string, email: string) {
  const p = getProgress();
  p.name = name;
  p.email = email;
  if (!p.startedAt) p.startedAt = new Date().toISOString();
  setProgress(p);
}

export function reset() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
