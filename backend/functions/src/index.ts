import { app } from "./server/hono";
import * as https from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";

setGlobalOptions({
  region: "asia-northeast1",
  maxInstances: 10,
  memory: "1GiB",
  timeoutSeconds: 60,
});

export default https.onRequest(async (req, res) => {
  const url = new URL(`${req.protocol}://${req.hostname}${req.url}`);

  const headers = new Headers();
  Object.keys(req.headers).forEach((key) => {
    headers.set(key, req.headers[key] as string);
  });

  const body = req.body ? JSON.stringify(req.body) : null;

  const honoRequest = new Request(url.toString(), {
    headers,
    method: req.method,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : body,
  });

  const honoResponse = await app.fetch(honoRequest);

  res.status(honoResponse.status);
  honoResponse.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const contentType = honoResponse.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    res.json(await honoResponse.json());
  } else {
    res.send(await honoResponse.text());
  }
});
