FROM node:14

COPY ./ /graphql_learn

WORKDIR /graphql_learn

RUN npm install

RUN npx prisma generate

RUN npx prisma migrate dev --preview-feature

CMD touch abc

CMD pwd
