# Public Service

This is the public microservice.

## Available Scripts

In the project directory, you can run:

"`npm install`"

Install the poject and all the dependencies

"`npm run dev`"

Runs the app in development mode.

### Security

The service has JWT token security on some of its requests.
* Get Subscriptions - SECURED
* Get Subscription By Id - SECURED
* Save Subscription 
* Cancel Subscription

Integration with login Service its not performed but you can login with this credentials through Login:
* user: admin
* password: admin

Helmet is used to manage the headers on responses. They can be adjusted due to the requirements.
