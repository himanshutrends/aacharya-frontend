# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Install PM2 globally
RUN npm install pm2 -g

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies including all necessary build tools
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app with PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
