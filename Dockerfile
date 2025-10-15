# Install dependencies only when needed
FROM node:20-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app

#BUILD_ENV_FILE will get value from docker build --build-arg data, default to .env.production
ARG BUILD_ENV_FILE=.env.production
RUN echo $BUILD_ENV_FILE

COPY . .

##-----------------------
# env file processing
# remove current production (if existed after copy full source)
RUN rm -f .env.production
# Copy environment to .env.production (because yarn build always use .env.production)
COPY ${BUILD_ENV_FILE} .env.production
##-----------------------/


COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# fix error not writable
RUN mkdir -p /home/nextjs && chown -R nextjs /home/nextjs
RUN mkdir 0777 -p /home/nextjs/.cache/yarn

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/cache-handler.mjs ./cache-handler.mjs

# Environment .env file will be mount from docker secret in docker stack yml
# COPY --from=builder /app/.env ./.env

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]