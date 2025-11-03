import apiProjects from "@/services/projects/projects.services";
import { useQuery } from "@tanstack/react-query";

type UseProjectMenuProps = {
  enabled?: boolean;
};

export const useProjectMenu = ({
  enabled = true,
}: UseProjectMenuProps = {}) => {
  const fetchProjectMenu = async () => {
    try {
      const { data } = await apiProjects.getProjectMenu();
      return data as {
        data: {
          id: number;
          name: string;
        }[];
      };
    } catch (err) {
      throw err;
    }
  };

  return useQuery({
    queryKey: ["getProjectMenu"],
    queryFn: fetchProjectMenu,
    retry: 3,
    gcTime: 5000,
    enabled: enabled,
  });
};
