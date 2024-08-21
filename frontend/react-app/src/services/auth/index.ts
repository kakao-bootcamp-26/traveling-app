import { indexApi } from "@/services";

export const authApi = indexApi.extend({
  prefixUrl: "api/auth",
});
