import apiProjects from "@/services/projects/projects.services";
import { useQuery } from "@tanstack/react-query";
import { ProjectRelatedAppListResponse } from "@/types/project/ProjectRelatedApp";

type ProjectListRelatedAppParams = {
  current_page?: number;
  per_page?: number;
};

type UseProjectListRelatedAppProps = {
  params: ProjectListRelatedAppParams;
  enabled?: boolean;
};

export const useProjectListRelatedApp = ({
  params,
  enabled = true,
}: UseProjectListRelatedAppProps) => {
  const fetchProjectListRelatedApp = async () => {
    const { data } = await apiProjects.getProjectListRelatedApp(params);
    return data as ProjectRelatedAppListResponse;
  };

  return useQuery({
    queryKey: ["getProjectListRelatedApp", params],
    queryFn: fetchProjectListRelatedApp,
    retry: 3,
    gcTime: 5000,
    enabled,
  });
};
