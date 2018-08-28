FROM php:7.0-apache

# NodeJS
RUN apt-get update
RUN apt-get install -y nodejs npm
RUN ln -s /usr/bin/nodejs /usr/local/bin/node
RUN ln -s /usr/bin/npm /usr/local/bin/npm
RUN npm cache clean -f
RUN npm install -g n
RUN n stable
ENTRYPOINT nodejs server/V3/server.js && apache2-foreground && /bin/bash
CMD ["TRUE"]
