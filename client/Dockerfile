# client/Dockerfile

### STAGE 1: Build the React application ###
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

### STAGE 2: Serve the application from a lightweight web server ###
FROM nginx:stable-alpine

# Copy the built files from the 'build' stage
COPY --from=build /app/client/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# The command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]