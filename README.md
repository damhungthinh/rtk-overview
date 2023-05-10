# Requirement:

1. Docker or Postgresql
2. NodeJS 16.7+

# How to run:

## API

A Node Server build by NestJS and Prisma

1. `cd api`
2. `yarn install` or `npm install`
3. `npx prisma migrate dev`
4. `yarn start:dev` or `npm run:dev`

Note: available script please see at `api/package.json`

## CLients

A ReactJS client build by Create React App and TailwindCSS

1. `cd client`
2. `yarn install` or `npm install`
3. `yarn start` or `npm run start`

Note: available script please see at `client/package.json`
