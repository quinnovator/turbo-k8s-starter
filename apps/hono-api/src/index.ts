import { Hono } from "hono";
import health from "@repo/hono-health";

const app = new Hono();

app.route("/health", health);

export default {
	fetch: app.fetch,
	port: 8081,
};
