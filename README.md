# Micro Service Environment

## Introduction

The project has been developed to pass the technical test presented. It consists of 3 microservices that communicate with each other. The aim is to create a small subscription management structure and to demonstrate some of the knowledge of microservices distributed architectures.

### Public Service

This service publishes all endpoints required for subscription management. It redirects everything that comes to it to the corresponding service.

#### Test the Architecture

`docker-compose up -d --build`

This command will execute the *docker-compose.yml* script and build the images and containers to test the whole project.

In addition to this, each of the microservices can be run separately by following the instructions detailed in their READMEs.


