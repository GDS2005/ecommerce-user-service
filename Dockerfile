# Use the official Node.js 16 image as the base image
FROM node:16

# Create and change to the app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the app code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the app
CMD ["npm", "start"]