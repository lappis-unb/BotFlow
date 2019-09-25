FROM tiangolo/node-frontend:10 as build-stage

RUN mkdir /botflow
WORKDIR /botflow
COPY ./app/package*.json .

RUN npm install
