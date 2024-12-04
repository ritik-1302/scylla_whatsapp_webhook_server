import express, { urlencoded, json } from "express";
import serverless from "serverless-http";
import process from "process";

import {statusRouter} from "./routes/status_router.js";
import {webhookRouter} from "./routes/webhook_router.js";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());


app.use("/status",statusRouter);
app.use("/webhook", webhookRouter);

app.get("/env", (req, res) => {
  res.send(`${process.env.WEBHOOK_VERIFY_TOKEN}`);
});


export const handler = serverless(app);


// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });
