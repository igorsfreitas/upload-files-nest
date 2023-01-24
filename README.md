<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A simple, efficient and scalable server-side api with <a href="http://nodejs.org" target="_blank">Node.js</a> to Upload and Find Files.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running the app in debug mode

You can simply press F5 on your keyboard to start the application in debug mode.

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```

## Step by Step to build the project using the Dockerfile
```bash
    # build the image
    docker build . -t upload-files

    # run the image in container
    docker run -d -p 3000:3000 --name upload-files upload-files
```

## To Clean your docker envoiroment before new upload-files builds
```bash
    # remove the container  
    docker rm upload-files

    # remove the image
    docker rmi upload-files
```
