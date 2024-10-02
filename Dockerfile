#FROM node:alpine
#
#WORKDIR /usr/src/app
#
#COPY package.json ./
#COPY yarn.lock ./
#
#RUN yarn install --frozen-lockfile && yarn cache clean
#
#EXPOSE 3000
#
#COPY . .
#
#RUN yarn build
#
#CMD ["yarn", "start:prod"]

FROM node:alpine as dev-stage

# Create app directory
RUN mkdir -p /usr/src/app

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy source code
COPY . .

# build app
RUN yarn build

FROM node:alpine as  prod-stage

# Create app directory
RUN mkdir -p /usr/src/app

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --only=production

# Copy source code
COPY --from=dev-stage /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

# Run app
CMD ["yarn", "start:prod"]