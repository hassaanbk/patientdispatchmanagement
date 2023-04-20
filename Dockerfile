FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install

RUN apk add --no-cache libc-dev
RUN export LD_LIBRARY_PATH=/usr/lib/aarch64-linux-gnu

COPY . .
EXPOSE 5000

CMD ["yarn", "run", "start", "--production"]
