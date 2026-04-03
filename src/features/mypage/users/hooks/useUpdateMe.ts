import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/user.api";
import { queryKeys } from "@/shared/api/queryKeys";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.me(),
      });
    },
  });
}
