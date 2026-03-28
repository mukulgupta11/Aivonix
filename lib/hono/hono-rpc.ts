import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

function resolveBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL;
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const client = hc<AppType>(resolveBaseUrl());

export const api = client.api;
