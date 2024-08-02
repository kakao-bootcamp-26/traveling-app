// https://www.handongryong.com/post/msw/
// https://oliveyoung.tech/blog/2024-01-23/msw-frontend/
// https://velog.io/@wns450/msw-next-%EC%9D%B4%EC%8A%88

import { createMiddleware } from "@mswjs/http-middleware";
import express from "express";
import cors from "cors";
import { handlers } from "../handlers/handlers";

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);

app.use(express.json());
app.use(createMiddleware(...handlers));
app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});
