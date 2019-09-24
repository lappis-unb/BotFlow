FROM tiangolo/node-frontend:10 as build-stage

RUN mkdir /botflow
WORKDIR /botflow
COPY ./app .

RUN npm install

<<<<<<< HEAD
=======
ENV REACT_APP_URL_API https://botflow-api.dev.lappis.rocks/

>>>>>>> Add export data button and improve production dockerfile
ARG configuration=production

RUN npm run build

FROM nginx:1.15

COPY --from=build-stage /botflow/build/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
