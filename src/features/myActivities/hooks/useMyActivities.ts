import { getMyActivities } from "@/features/myActivities/api/getMyActivities";
import { type ActivitiesListResponse } from "@/features/activities/schemas/activity.schema";
import { queryKeys } from "@/shared/api/queryKeys";

export function useMyActivities() {
  const fetchActivities = async (cursorId: number | null) => {
    return await getMyActivities({ cursorId, size: 20 });
  };
  const getNextCursor = (lastPage: ActivitiesListResponse) => {
    return lastPage.cursorId ?? null;
  };
  return {
    fetchActivities,
    getNextCursor,
    queryKey: queryKeys.myActivities.list({ size: 20 }),
  };
}
