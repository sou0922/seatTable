import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: process.env.SERVICE_DOMAIN || "default_DOMAIN",
    apiKey: process.env.API_KEY || "default_API"
})