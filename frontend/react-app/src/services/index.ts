import ky from "ky";

export const indexApi = ky.create({
  prefixUrl: import.meta.env.VITE_API_SERVER,
});
