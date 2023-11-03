#FROM public.ecr.aws/bitnami/node:16.15.0 as base
#FROM node:15.14 as base
FROM node:14-alpine AS base

WORKDIR /home/node/app

#RUN apt-get update || : && apt-get install python-pip -y || : && pip install awscli || : && apt-get install vim dnsutils -y
COPY .aws /root/.aws

RUN npm install pm2 -g
COPY package*.json ./
RUN npm i

COPY . .
RUN npm run lint

FROM base as production

WORKDIR /home/node/app

#ENV NODE_PATH=./dist

RUN npm run build

ENV PORT=80

EXPOSE 80

CMD ["npm" , "start"]
####CMD [ "pm2-runtime", "npm run -- dev:start" ]
