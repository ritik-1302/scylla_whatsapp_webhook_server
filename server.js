import express, { urlencoded, json } from "express";
import serverless from "serverless-http";

import {connectDB} from "./utils/functions/db_connection.js";
import {statusRouter} from "./routes/status_router.js";
import {webhookRouter} from "./routes/webhook_router.js";

await connectDB();
const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());


app.use("/status",statusRouter);
app.use("/webhook", webhookRouter);


export const handler = serverless(app);


// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });
