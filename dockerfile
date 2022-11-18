FROM node:16-slim

# Create App Directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied

COPY package*.json ./

RUN npm install --force
# If you are building your code for production
# RUN npm install --only=production

# Copy app source code
COPY --chown=node:node . .

# Container PORT
EXPOSE 8080

RUN chown -R node:node /usr/src/app

USER node

## Launch the wait tool and then your application
CMD ["npm","start"]