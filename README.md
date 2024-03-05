# tcp-mqtt-node
 A tcp server for listening data from teltonika devices and broadcast to mqtt broker

 ## Deployment Steps
```
$ node index.js
```
# List of services
tcp with configurable external port, internal port: 7554
mqtt with configurable broker and topic

## Build Setup

```
bash
# Start New nodejs
$ npm init -y

# install dependencies
$ npm install mqtt dotenv

# serve with hot reload at localhost:7554
$ node index.js
```

# dockerize nuxt-apps
```
$ docker build . -t aneh2killa/tcp-server-node
```
# to push the apps to dockerhub
```
$ docker push aneh2killa/tcp-server-node

# to run on docker
```
$ docker run -it -p 7777:7554 aneh2killa/tcp-server-node
```
# Reset the node Modules
```
$ rm -rf node_modules
$ rm package-lock.json
$ npm install
```
