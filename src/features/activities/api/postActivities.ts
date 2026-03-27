import axios from "axios";
import {
  CreateActivitySchema,
  CreateActivityRequest,
} from "../schemas/activity.schema";

export const postActivity = async (body: CreateActivityRequest) => {
  const validated = CreateActivitySchema.parse(body);

  const res = await axios.post(
    "https://sp-globalnomad-api.vercel.app/21-3/activities",
    validated,
  );

  return res.data;
};
