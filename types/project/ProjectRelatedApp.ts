export type ProjectRelatedApp = {
  id: number;
  name: string;
  title: string;
  slug: string;
  featured: number;
  updated_at: string; // ISO datetime
  icon_featured: string;
  image_featured: string;
  qr_app: string;
};

export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type ProjectRelatedAppListResponse = {
  current_page: number;
  data: ProjectRelatedApp[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};
