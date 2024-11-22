import { Plugin } from "$fresh/server.ts";

export interface ContextualData {
  user: { id: number; username: string } | null;
  // Add more contextual data as needed
}

export default function contextualDataPlugin(): Plugin {
  return {
    name: "contextual-data",
    render(ctx) {
      ctx.state.contextualData = {};
    },
    fetchResponse(response) {
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        return response.json().then((data) => {
          if (data._context) {
            ctx.state.contextualData = data._context;
            delete data._context;
          }
          return new Response(JSON.stringify(data), response);
        });
      }
      return response;
    },
  };
}