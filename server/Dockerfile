FROM node:18-alpine3.16 as builder
WORKDIR /myapp/server
COPY ./package*.json ./
RUN npm install 
COPY . .    

FROM gcr.io/distroless/nodejs18-debian12
COPY --from=builder /myapp/server /myapp/server
WORKDIR /myapp/server
EXPOSE 6001
CMD ["index.js"]