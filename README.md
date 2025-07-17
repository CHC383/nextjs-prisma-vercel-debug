# NextJs-Prisma-Vercel-Debug

Reproduction for
https://github.com/prisma/prisma/issues/27486#issuecomment-3074857668

## Current behavior

## Expected behavior

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
