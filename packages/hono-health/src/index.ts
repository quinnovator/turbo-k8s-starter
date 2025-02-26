import { Hono } from "hono";

const health = new Hono();

health.get("/", (c) => {
	const memoryUsage = process.memoryUsage();
	const cpuUsage = process.cpuUsage();

	return c.json({
		status: "OK",
		memory_usage: memoryUsage,
		cpu_usage: cpuUsage,
	});
});

export default health;
