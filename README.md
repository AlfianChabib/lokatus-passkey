# Cloudflare Workers Typescript Template

```bash
npm install
npm run dev
```

## Create D1 SQL Database on Cloudflare

```npm
npx wrangler d1 create passkey
```

Copy result `[[d1_databases]]` section to `wrangler.toml`
example result:

```toml
[[d1_databases]]
binding = "DB"
database_name = "passkey"
database_id = "<database_id>"
```

## Prisma Migrate

This command makes to migrate Prisma and change to the D1 database, either local or remote.

```bash
npx wrangler d1 migrations create passkey create_passkey_table

npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel ./prisma/schema.prisma \
  --script \
  --output migrations/0001_create_passkey_table.sql
```

Migrate the database model to D1.

```bash
npx wrangler d1 migrations apply passkey --local
npx wrangler d1 migrations apply passkey --remote
npx prisma generate
```

Seed the database model to D1.

```bash
npx wrangler d1 execute passkey --remote --file=./schema.sql
```

## Config Prisma Type

In order to query your database from the D1 database using Prisma, you need to add types with:

```bash
npx wrangler types
```

## Deploy

```bash
npm run deploy
```
