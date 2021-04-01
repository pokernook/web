FROM node:15.12.0-alpine AS node

FROM node AS install
WORKDIR /install
COPY package*.json ./
RUN npm ci

FROM node AS build
WORKDIR /build
COPY . .
COPY --from=install /install/node_modules ./node_modules
RUN npm run build

FROM node AS app
WORKDIR /app
ENV NODE_ENV production
COPY --from=build /build/public ./public
COPY --from=build /build/.next ./.next
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package.json ./package.json
CMD ["npm", "run", "start"]
