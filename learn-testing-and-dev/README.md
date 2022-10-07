# react-web-app

A React web app that is built with testing in mind

## How to get started

### Install stuff

```bash
npm init -y
npm i create-react-app
npx create-react-app my-app
cd my-app
npm start
```

### 🧪️Testing strategy

| Expected Behavior                       | Tested? | Test Type | Technologies |
| --------------------------------------- | ------- | --------- | ------------ |
| A URL with the right text exists        | 🙅‍♂️      |           |              |
| App renders correctly                   | 🙅‍♂️      |           |              |
| URL is correct                          | 🙅‍♂️      |           |              |
| App looks as expected on web and mobile | 🙅‍♂️      |           |              |
| Front-end performance is at least a B   | 🙅‍♂️      |           |              |
| App is secure                           | 🙅‍♂️      |           |              |
| App is accessibility friendly           | 🙅‍♂️      |           |              |

### Run the tests that come with our app

- In a new terminal `npm run test`

Now that everything is working, let's push this up to CI so that we can make sure it continues to work on other computers besides ours.

### Create CI Pipeline

- A little about [Github Actions](https://github.com/features/actions)

### Add another test

| Expected Behavior                       | Tested? | Test Type | Technologies                |
| --------------------------------------- | ------- | --------- | --------------------------- |
| A URL with the right text exists        | ✅      | Component | React testing library, Jest |
| App renders correctly                   | 🙅‍♂️      |           |                             |
| URL is correct                          | ✅      | Component | React testing library, Jest |
| App looks as expected on web and mobile | 🙅‍♂️      |           |                             |
| Front-end performance is at least a B   | 🙅‍♂️      |           |                             |
| App is secure                           | 🙅‍♂️      |           |                             |
| App is accessibility friendly           | 🙅‍♂️      |           |                             |

- Add a test for checking that the url is correct
- Update the url text
- Update the code to use a test id
- Commit and push to CI

### Shift-right and add a visual test

| Expected Behavior                       | Tested? | Test Type | Technologies                |
| --------------------------------------- | ------- | --------- | --------------------------- |
| A URL with the right text exists        | ✅      | Component | React testing library, Jest |
| App renders correctly                   | 🙅‍♂️      |           |                             |
| URL is correct                          | ✅      | Component | React testing library, Jest |
| App looks as expected on web and mobile | 🙅‍♂️      |           |                             |
| Front-end performance is at least a B   | 🙅‍♂️      |           |                             |
| App is secure                           | 🙅‍♂️      |           |                             |
| App is accessibility friendly           | 🙅‍♂️      |           |                             |

- Learn about [webdriverio](https://webdriver.io/docs/gettingstarted) and [screenerio](https://screener.io/)
- install wdio

```bash
npm install @wdio/cli
```

- setup wdio

`npx wdio config`

- paste the following code as the new test

```js
describe("My React application", () => {
  it("should look correct", () => {
    browser.url("");
    browser.execute("/*@visual.init*/", "My React App");
    browser.execute("/*@visual.snapshot*/", "Home Page");
    const result = browser.execute("/*@visual.end*/");
    expect(result.message).toBeNull();
  });
});
```

**🧪️Test Plan**

| Expected Behavior                       | Tested? | Test Type  | Technologies                |
| --------------------------------------- | ------- | ---------- | --------------------------- |
| A URL with the right text exists        | ✅      | Component  | React testing library, Jest |
| App renders correctly                   | ✅      | visual d2d | Webdriverio, Screener.io    |
| URL is correct                          | ✅      | Component  | React testing library, Jest |
| App looks as expected on web and mobile | ✅      | visual d2d | Webdriverio, Screener.io    |
| Front-end performance is at least a B   | 🙅‍♂️      |            |                             |
| App is secure                           | 🙅‍♂️      |            |                             |
| App is accessibility friendly           | 🙅‍♂️      |            |                             |
