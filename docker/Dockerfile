# Stage 1: Build the application
FROM node:lts AS BUILD_IMAGE

ARG NPM_TOKEN
ARG MAXMIND_KEY

# Work Directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY .npmrc.docker .npmrc

RUN npm i -g rimraf

# Install Dependencies
RUN npm install

# run rarely, build time goes up to 8mins when ran
#RUN cd node_modules/geoip-lite && npm run-script updatedb license_key=${MAXMIND_KEY}

COPY . .

RUN rm -f .npmrc
# build application
RUN npm run build

# remove development dependencies
RUN npm prune --production

# Stage 2: Create the production image
FROM node:lts

# Install necessary dependencies
# RUN apk add --no-cache libc6-compat

# Work Directory
WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app .

EXPOSE 8000

CMD [ "npm", "run", "start:prod" ]
