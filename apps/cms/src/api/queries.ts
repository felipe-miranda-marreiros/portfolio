import { QueryClient, queryOptions } from "@tanstack/react-query";
import { api } from "./client";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

export const experienceList = queryOptions({ queryKey: ["experience"], queryFn: api.listExperience });

export const experienceItem = (id: string) =>
  queryOptions({ queryKey: ["experience", id], queryFn: () => api.getExperience(id) });

export const profileQuery = queryOptions({ queryKey: ["profile"], queryFn: api.getProfile });

export const skillList = queryOptions({ queryKey: ["skills"], queryFn: api.listSkills });
