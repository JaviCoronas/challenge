# Public Service

This is the public microservice.

## Requirements

In order to test the project, you must have the following tools installed on your computer
* Node v12
* Docker


## Available Scripts

In the project directory, you can run:

`npm install`

Install the poject and all the dependencies

`npm run dev`

Runs the app in development mode.

### Security

The service has JWT token security on some of its requests.
* Get Subscriptions - SECURED
* Get Subscription By Id - SECURED
* Save Subscription
* Cancel Subscription

### Error handling

The service includes error handling on login and subscriptions operations.



