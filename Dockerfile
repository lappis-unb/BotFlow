FROM node:10-jessie-slim 

RUN mkdir /botflow
WORKDIR /botflow
COPY /app/package.json .
RUN yarn install
COPY ./app .
EXPOSE 3000
CMD ["sh", "-c", "yarn start"] 