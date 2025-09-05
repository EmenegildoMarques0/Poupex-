import { defineConfig } from "orval";

export default defineConfig({
    api: {
        // https://poupex-api.onrender.com/docs?api-docs.json
        input: "https://poupex-api.onrender.com/docs?api-docs.json",
        output: {
            target: "./src/http/orval-api.ts",
            client: "fetch",
            httpClient: "fetch",
            clean: true,
            baseUrl: "https://poupex-api.onrender.com",

            override: {
                fetch: {
                    includeHttpResponseReturnType: false
                }
            }
        }
    }
})