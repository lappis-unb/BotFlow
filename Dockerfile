FROM node:10-jessie-slim 

RUN mkdir /botFlow
WORKDIR /botFlow
COPY ./app .
EXPOSE 3000
CMD ["sh", "-c", "yarn install && yarn start"] 