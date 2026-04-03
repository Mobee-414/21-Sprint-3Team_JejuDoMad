import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/user.api";
import { queryKeys } from "@/shared/api/queryKeys";

export function useMe() {
  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: getMe,
  });
}
