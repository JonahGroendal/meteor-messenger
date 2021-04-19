FROM ubuntu:18.04

WORKDIR /home/app

COPY ./bundle ./bundle

RUN apt-get update &&\
    apt-get install -y curl &&\
    curl -sL https://deb.nodesource.com/setup_8.x | bash - &&\
    apt-get install -y nodejs &&\
    apt-get install -y gcc g++ make &&\
    cd bundle/programs/server/ &&\
    npm install

WORKDIR /home/app/bundle

EXPOSE 3000
CMD [ "node", "main" ]
