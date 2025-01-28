import express, { urlencoded, json } from "express";
import serverless from "serverless-http";

import {connectDB} from "./utils/functions/db_connection.js";
import {statusRouter} from "./routes/status_router.js";
import {webhookRouter} from "./routes/webhook_router.js";
import { flowRouter } from "./routes/flow_router.js";

await connectDB();
const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());




app.use("/status",statusRouter);
app.use("/webhook", webhookRouter);
app.use("/flow",flowRouter)


export const handler = serverless(app);


// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });
