# Use a Node.js base image
FROM node:latest

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the ports used by the application
EXPOSE 8080

# Command to run the application
CMD ["node", "app.js"]
