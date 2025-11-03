import apiProjects from "@/services/projects/projects.services";
import { useQuery } from "@tanstack/react-query";

type UseProjectCategoryProps = {
  enabled?: boolean;
};

export const useProjectCategory = ({
  enabled = true,
}: UseProjectCategoryProps = {}) => {
  const fetchProjectCategory = async () => {
    try {
      const { data } = await apiProjects.getProjectCategory();
      return data as {
        data: {
          id: number;
          name: string;
          image: string;
        }[];
      };
    } catch (err) {
      throw err;
    }
  };

  return useQuery({
    queryKey: ["getProjectCategory"],
    queryFn: fetchProjectCategory,
    retry: 3,
    gcTime: 5000,
    enabled: enabled,
  });
};
