# Use official Node.js image as base image
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./ 

# Install dependencies
RUN npm install -g @nestjs/cli
RUN npm install

# Copy the entire backend project
COPY . .

# Build the NestJS application
RUN npm run build  

# Expose port your app is running on
EXPOSE 8080

# Start the application in production mode
CMD ["npm", "run", "start:prod"]
