# server/Dockerfile

# 1. Use an official Node.js runtime as a parent image
FROM node:20-alpine

# 2. Set the working directory in the container
WORKDIR /app/server

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install app dependencies
RUN npm install

# 5. Copy the rest of your app's source code
COPY . .

# 6. Make your app's port available to the outside world
EXPOSE 5001

# 7. Define the command to run your app
CMD ["node", "index.js"]