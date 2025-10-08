export type TableOfContent = {
  id: string;
  text: string;
  level: number;
  children?: {
    id: string;
    text: string;
    level: number;
  }[];
}[];

export type Metadata = Record<string, string | null>;
