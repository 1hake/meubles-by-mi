# Stage 1: Node image to build the React app
FROM node:14 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the React app
COPY . /app

# Build the app
RUN npm run build

# Stage 2: Nginx server to serve the React app
FROM nginx:alpine

# Copy the build output from stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
