ARG FUNCTION_DIR="/function"

FROM ubuntu:focal
ARG FUNCTION_DIR

RUN apt-get update; apt-get clean

# Add a user for running applications.
RUN useradd apps
RUN mkdir -p /home/apps && chown apps:apps /home/apps

# Install xvfb and other stuff.
RUN apt-get install -y xvfb fluxbox wget wmctrl gnupg2

# Set the Chrome repo.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# Install Chrome.
RUN apt-get update && apt-get -y install google-chrome-stable

# Install utils for ric
RUN apt install -y curl wget git g++ make cmake unzip libcurl4-openssl-dev autoconf libtool

# install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs
RUN npm install -g yarn

# App setup
RUN mkdir -p ${FUNCTION_DIR}
COPY function/package.json ${FUNCTION_DIR}
WORKDIR ${FUNCTION_DIR}

# Install rick
RUN npm i aws-lambda-ric

# Install deps
RUN yarn

# Add Lambda Runtime Interface Emulator and use a script in the ENTRYPOINT for simpler local runs
ADD https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie /usr/local/bin/aws-lambda-rie
RUN chmod 755 /usr/local/bin/aws-lambda-rie
COPY bootstrap.sh /
RUN chmod 755 /bootstrap.sh
ENTRYPOINT [ "/bootstrap.sh" ]

# Copy extension (temporary until s3)
COPY extension.zip /tmp

# Build app (last for cache speed)
COPY function/. ${FUNCTION_DIR}
RUN yarn build
WORKDIR ${FUNCTION_DIR}/.build

CMD ["app.handler"]