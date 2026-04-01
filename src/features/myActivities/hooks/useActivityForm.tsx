import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActivityFormSchema,
  type ActivityFormInput,
  type ActivityRequest,
  type ActivityDetail,
} from "@/features/activities/schemas/activity.schema";

interface UseActivityFormProps {
  mode: "register" | "edit";
  initialData?: Partial<ActivityDetail>;
}

const isActivityDetail = (data: unknown): data is ActivityDetail => {
  return data !== null && typeof data === "object" && "subImages" in data;
};

export const useActivityForm = ({
  mode,
  initialData,
}: UseActivityFormProps) => {
  const formMethods = useForm<ActivityFormInput, undefined, ActivityRequest>({
    resolver: zodResolver(ActivityFormSchema) as unknown as Resolver<
      ActivityFormInput,
      undefined,
      ActivityRequest
    >,
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: "",
      address: "",
      bannerImageUrl: "",
      subImageUrls: [],
      schedules: [{ date: "", startTime: "12:00", endTime: "13:00" }],
    },
  });

  const { reset, setValue } = formMethods;

  useEffect(() => {
    if (mode === "edit" && initialData && Object.keys(initialData).length > 0) {
      const mappedData: Partial<ActivityFormInput> = {
        title: initialData.title ?? "",
        category: initialData.category ?? "",
        description: initialData.description ?? "",
        address: initialData.address ?? "",
        bannerImageUrl: initialData.bannerImageUrl ?? "",
        price: initialData.price !== undefined ? String(initialData.price) : "",
      };

      reset(
        {
          ...mappedData,
          schedules: initialData.schedules?.map((s) => ({
            id: s.id,
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime,
          })) ?? [{ date: "", startTime: "12:00", endTime: "13:00" }],
          subImageUrls: isActivityDetail(initialData)
            ? (initialData.subImages?.map((img) => img.imageUrl) ?? [])
            : [],
        } as ActivityFormInput,
        { keepDefaultValues: false },
      );
    }
  }, [initialData, mode, reset, setValue]);

  return formMethods;
};
