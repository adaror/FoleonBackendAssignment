FROM node:18-alpine

# Set the working directory to /app.
WORKDIR /app

# Copy package.json and package-lock.json to the container.
COPY package*.json ./

# Install the project dependencies.
RUN npm install

# Copy the rest of the application code to the container.
COPY . .

RUN npm run build

# Expose the port the application will be running on.
EXPOSE 3000

# Start the application.
CMD [ "node", "dist/main" ]