FROM mhart/alpine-node:12.13.0
# 79.4 MB (npm 6.12.0, yarn 1.19.1)
# minimal node.js docker images built on alpine linux

# install git creating working directory
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh && \
    mkdir -p /usr/srv/veneerbook

# copy files to working directory
COPY . /usr/srv/veneerbook/

# change working directory
WORKDIR /usr/srv/veneerbook

# install node dependencies
RUN npm install

# launch application
CMD ["npm","start"]
