import type { APIRoute } from "astro";
import { HUGGINGFACE_TOKEN } from "astro:env/server";

export const GET: APIRoute = async (req) => {

  return Response.json({
    token: HUGGINGFACE_TOKEN,
  });
};