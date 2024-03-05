# # Use an official Node.js LTS (Long Term Support) version as a base image
# FROM node:14

# # Create app directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install app dependencies
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Expose the port your app runs on
# EXPOSE 7500

# # Set the timezone environment variable
# ENV TZ Asia/Kuala_Lumpur

# # Command to run the application
# CMD [ "node", "index.js" ]


# FROM node:16
FROM mhart/alpine-node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Load environment variables from .env file
ENV NODE_ENV=production
ENV TCP_PORT=$TCP_PORT
EXPOSE $TCP_PORT

# Actual timezone env variable set
ENV TZ Asia/Kuala_Lumpur
CMD [ "node", "index.js" ]
