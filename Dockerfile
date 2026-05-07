# Use official Node.js image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose app port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]