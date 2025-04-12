# Use official Node.js image as base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend project
COPY . .

# Build the Next.js application for production
RUN npm run build

# Expose port your app is running on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
