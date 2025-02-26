import { describe, it, expect } from "bun:test";
import health from "../src/index";

describe("Health endpoint", () => {
	it("should return status OK with memory and CPU usage", async () => {
		const req = new Request("http://localhost/");
		const res = await health.fetch(req);
		expect(res.status).toBe(200);
		const json = await res.json();
		expect(json.status).toBe("OK");
		expect(json.memory_usage).toBeDefined();
		expect(json.cpu_usage).toBeDefined();
	});
});
