import apiProjects from "@/services/projects/projects.services";
import { useQuery } from "@tanstack/react-query";

type ProjectListProject = {
  id: number;
  slug: string;
  name: string;
  title: string;
  logo: string;
  background: string;
  image: string;
  year: number;
  featured: number;
  updated_at: string;
};

type ProjectListLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type ProjectListResponse = {
  current_page: number;
  data: ProjectListProject[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ProjectListLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

type ProjectListParams = {
  current_page?: number;
  per_page?: number;
  category_search?: string | number;
  search?: string;
  field_search?: string | number;
  id?: string | number;
  is_featured?: boolean;
};

type UseProjectListProps = {
  params: ProjectListParams;
  enabled?: boolean;
};

export const useProjectList = ({
  params,
  enabled = true,
}: UseProjectListProps) => {
  const fetchProjectList = async () => {
    try {
      const dataSubmit: any = {};

      if (params.current_page) {
        dataSubmit.current_page = params.current_page;
      }

      if (params.per_page) {
        dataSubmit.per_page = params.per_page;
      }

      if (params.category_search) {
        dataSubmit.category_search = params.category_search;
      }

      if (params.search) {
        dataSubmit.search = params.search;
      }

      if (params.field_search) {
        dataSubmit.field_search = params.field_search;
      }

      if (params.id) {
        dataSubmit.id = params.id;
      }

      if (params.is_featured) {
        dataSubmit.is_featured = params.is_featured;
      }

      const { data } = await apiProjects.getProjectList(dataSubmit);
      return data as ProjectListResponse;
    } catch (err) {
      throw err;
    }
  };

  return useQuery({
    queryKey: ["getProjectList", params],
    queryFn: fetchProjectList,
    retry: 3,
    gcTime: 5000,
    enabled: enabled,
  });
};
