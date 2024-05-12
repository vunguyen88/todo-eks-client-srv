# Stage 1: Build the React app
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built assets using Nginx
FROM nginx:alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy the built assets from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (the default port for HTTP traffic)
EXPOSE 3000

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
