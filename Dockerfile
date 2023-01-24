FROM node:16-alpine as build

WORKDIR /usr/share/upload

ADD . .

RUN apk add --no-cache make g++ python3 yarn \    
    && yarn \    
    && yarn build

FROM node:16-alpine

WORKDIR /app

COPY --from=build /usr/share/upload/dist dist
COPY --from=build /usr/share/upload/node_modules node_modules
COPY --from=build /usr/share/upload/package.json package.json

EXPOSE 3000

CMD ["node", "dist/main.js"]
