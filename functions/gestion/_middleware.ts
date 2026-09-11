import { authorize, failure } from "../../server/billing";
export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    await authorize(context.request, context.env);
    const original = await context.next();
    const response = new Response(original.body, original);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  } catch (error) { return failure(error); }
};
