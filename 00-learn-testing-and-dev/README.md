# 00-learn-testing-and-dev

A React web app that is built with testing in mind

### Install stuff

```bash
npm init -y
npm i create-react-app
npx create-react-app my-app
cd my-app
npm start
```

### Run the tests that come with our app

- In a new terminal `npm run test`

Now that everything is working, let's push this up to CI so that we can make sure it continues to work on other computers besides ours.

### Create CI Pipeline by using [Github Actions](https://github.com/features/actions)

### π§ͺοΈTesting strategy

| Expected Behavior                       | Tested? | Test Type                    | Technologies                |
| --------------------------------------- | ------- | ---------------------------- | --------------------------- |
| A URL with the right text exists        | β      | Component                    | React testing library, Jest |
| App renders correctly                   | β      | visual d2d (dom to database) | Webdriveio, Screener.io     |
| URL is correct                          | β      | Component                    | React testing library, Jest |
| App looks as expected on web and mobile | β      | visual d2d                   | Webdriverio, Screener.io    |
| Front-end performance is at least a B   | πββοΈ      |                              |                             |
| App is secure                           | πββοΈ      |                              |                             |
| App is accessibility friendly           | πββοΈ      |                              |                             |
