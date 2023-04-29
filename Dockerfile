FROM node:alpine

# Create work directory
WORKDIR /usr/src/app

# Copy app source to work directory
COPY . /usr/src/app

# Install app dependencies
RUN npm install

RUN npm run build

EXPOSE 8080

# Build and run the app
CMD npm run serve