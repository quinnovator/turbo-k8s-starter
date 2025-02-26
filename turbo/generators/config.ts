import type { PlopTypes } from "@turbo/gen";
import { resolve } from "node:path";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	/**
	 * 1. Bun Package Generator
	 * Creates a new TypeScript-based (Bun) package in /packages.
	 */
	plop.setGenerator("bun-package", {
		description: "Create a new Bun package (TypeScript) in /packages",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of the Bun package?",
			},
		],
		actions: [
			{
				type: "addMany",
				destination: resolve(__dirname, "../../packages/{{kebabCase name}}"),
				base: "templates/bun-package",
				templateFiles: "templates/bun-package/**",
				stripExtensions: ["hbs"],
			},
		],
	});

	/**
	 * 2. Python Package Generator
	 * Creates a new Python-based package in /packages.
	 */
	plop.setGenerator("python-package", {
		description: "Create a new Python package in /packages",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of the Python package?",
			},
		],
		actions: [
			{
				type: "addMany",
				destination: resolve(__dirname, "../../packages/{{kebabCase name}}"),
				base: "templates/python-package",
				templateFiles: "templates/python-package/**",
				stripExtensions: ["hbs"],
			},
		],
	});

	/**
	 * 3. Go Package Generator
	 * Creates a new Go-based package in /packages.
	 * Also prompts for the GitHub repo to set up imports.
	 */
	plop.setGenerator("go-package", {
		description: "Create a new Go package in /packages",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of the Go package?",
			},
			{
				type: "input",
				name: "goRepo",
				message: "What is your GitHub repo (for the module name)?",
				default: "github.com/your-username/your-repo",
			},
		],
		actions: [
			{
				type: "addMany",
				destination: resolve(__dirname, "../../packages/{{kebabCase name}}"),
				base: "templates/go-package",
				templateFiles: "templates/go-package/**",
				stripExtensions: ["hbs"],
			},
		],
	});

	/**
	 * 4. Bun Service Generator
	 * Creates a new Bun-based microservice (similar to apps/hono-api).
	 * Prompts for the port to listen on.
	 */
	plop.setGenerator("bun-service", {
		description: "Create a new Bun-based microservice in /apps",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of the Bun service?",
			},
			{
				type: "input",
				name: "port",
				message: "Which port do you want to use?",
				default: "8080",
			},
		],
		actions: [
			{
				type: "addMany",
				destination: resolve(__dirname, "../../apps/{{kebabCase name}}"),
				base: "templates/bun-service",
				templateFiles: [
					"templates/bun-service/**",
					"!templates/bun-service/Dockerfile.hbs",
				],
				stripExtensions: ["hbs"],
			},
			{
				type: "add",
				path: resolve(__dirname, "../../apps/{{kebabCase name}}/Dockerfile"),
				templateFile: "templates/bun-service/Dockerfile.hbs",
			},
		],
	});

	/**
	 * 5. Python Service Generator
	 * Creates a new Python-based microservice in /apps.
	 * Prompts for the port to listen on.
	 */
	plop.setGenerator("python-service", {
		description: "Create a new Python-based microservice in /apps",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of the Python service?",
			},
			{
				type: "input",
				name: "port",
				message: "Which port do you want to use?",
				default: "8080",
			},
		],
		actions: [
			{
				type: "addMany",
				destination: resolve(__dirname, "../../apps/{{kebabCase name}}"),
				base: "templates/python-service",
				templateFiles: [
					"templates/python-service/**",
					"!templates/python-service/Dockerfile.hbs",
				],
				stripExtensions: ["hbs"],
			},
			{
				type: "add",
				path: resolve(__dirname, "../../apps/{{kebabCase name}}/Dockerfile"),
				templateFile: "templates/python-service/Dockerfile.hbs",
			},
		],
	});

	/**
	 * 6. Go Service Generator
	 * Creates a new Go-based microservice in /apps.
	 * Prompts for both the GitHub repo for module imports and the port.
	 */
	plop.setGenerator("go-service", {
		description: "Create a new Go-based microservice in /apps",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of the Go service?",
			},
			{
				type: "input",
				name: "goRepo",
				message: "What is your GitHub repo (for the module name)?",
				default: "github.com/your-username/your-repo",
			},
			{
				type: "input",
				name: "port",
				message: "Which port do you want to use?",
				default: "8080",
			},
		],
		actions: [
			{
				type: "addMany",
				destination: resolve(__dirname, "../../apps/{{kebabCase name}}"),
				base: "templates/go-service",
				templateFiles: [
					"templates/go-service/**",
					"!templates/go-service/Dockerfile.hbs",
				],
				stripExtensions: ["hbs"],
			},
			{
				type: "add",
				path: resolve(__dirname, "../../apps/{{kebabCase name}}/Dockerfile"),
				templateFile: "templates/go-service/Dockerfile.hbs",
			},
		],
	});
}
