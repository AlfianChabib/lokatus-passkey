import { Hono } from "hono";
import prismaClients from "./lib/prisma";

type Bindings = { MY_KV: KVNamespace; DB: D1Database };

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
  const prisma = await prismaClients.fetch(c.env.DB);
  const passkey = await prisma.passkey.findUnique({
    where: { id: 1 },
  });
  return c.json({ passkey });
});

app.onError((error, c) => {
  console.error(error);
  return c.json({ error: error.message }, 500);
});

export default {
  fetch: async (request: Request, env: Bindings, ctx: ExecutionContext) => {
    return await app.fetch(request, env, ctx);
  },
  scheduled: async (controller: ScheduledController, env: Bindings, ctx: ExecutionContext) => {
    const prisma = await prismaClients.fetch(env.DB);

    const createPasskey = async () => {
      const randomInt = Math.floor(1000 + Math.random() * 9000);
      const newPaskey = "lokatus" + randomInt.toString();
      await prisma.passkey.update({
        where: { id: 1 },
        data: { key: newPaskey },
      });
    };

    ctx.waitUntil(createPasskey());
  },
};
