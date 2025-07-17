# NextJs-Prisma-Vercel-Debug

Reproduction for
https://github.com/prisma/prisma/issues/27486#issuecomment-3074857668

Website: https://nextsj-prisma-vercel-debug.vercel.app/

## Context

Debug Next.Js 15 + Webpack 5 + Prisma 6 + Vercel stack

## Current behavior

The website shows

```
Application error: a server-side exception has occurred while loading nextsj-prisma-vercel-debug.vercel.app
```

And the log shows

```
Error [PrismaClientKnownRequestError]:
Invalid `prisma.quotes.findMany()` invocation:


Cannot find module '@prisma/client/runtime/query_compiler_bg.postgresql.wasm'
Require stack:
- /vercel/path0/lib/generated/prisma/internal/class.ts
    at async i (.next/server/app/page.js:1:2662) {
  code: 'MODULE_NOT_FOUND',
  meta: [Object],
  clientVersion: '6.12.0',
  digest: '877975774'
}
```

## Expected behavior

The NextJs application fetches data from the database properly, and showing a
page similar to https://nextjs-starter-webpack.vercel.app/

## Guide

### Introduction

This repo is based on https://github.com/jkomyno/nextjs-starter-webpack with the
following changes:

- Update TailwindCSS to v4
- Update zod to v4
- Update eslint to v9
- Update other dependencies to the latest
- Check in `prisma/migrations`
- Add `await connection()` to `Quotes` in `components/quotes.tsx`, so that it is
  not pre-renderred and the database is not fetched during build time.
- Add PostgreSQL docker container to run a local database. The connection
  strings can be found in `.env.example`

### Prerequisites

- Node.js 22.17.1
- Docker desktop or docker engine
- pnpm

### Getting started

#### Local

- Create `.env` by copying `.env.example`
- Run the following commands

  ```bash
  # Install dependencies and generate Prisma client
  pnpm install

  # Start the PostgreSQL container
  pnpm run-db

  # Migrate the database
  pnpm migrate-db

  # Seed the database with prisma/seed.ts
  pnpm seed-db

  # Start the dev server
  pnpm dev

  # Build the app (lint and type checking)
  pnpm build
  ```

#### Vercel

- Create a [Vercel](https://vercel.com/) project with your forked repository
- Create a PostgreSQL database with [Prisma Database](https://www.prisma.io/).
  For the sake of simplicity, the Prisma client in this project doesn't use
  Prisma Accelerate extension, please use the Any Client direct connect string.
- Set `DATABASE_URL` and `DIRECT_URL` with the connect string acquire above in
  the Vercel environment variable.
- Trigger Vercel deployment to deploy the code.
