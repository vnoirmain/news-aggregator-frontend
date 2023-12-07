# Dockerfile

# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the entire React project to the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Run npm start when the container starts
CMD ["npm", "start"]
