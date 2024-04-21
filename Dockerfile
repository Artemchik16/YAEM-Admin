# Use official Node.js image as a base
FROM node:20

# Set working directory inside the container
WORKDIR /YAEM-admin

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to work directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
