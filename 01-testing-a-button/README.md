# Testing Web Applications

The modern web application typically runs on some type of JavaScript framework such as Angular, React, or Vue. A guiding principle of testing such web applications is to think about how we can do so without an actual browser. In many cases, a combination of component, unit, and visual tests will be the most powerful in ensuring quality web applications.

## Testing a button

✅ Do: Use a component test with a virtual DOM instead of an actual browser

❌ Otherwise: Extra dependencies will create more complications and work, with no added benefit:

⚠️ Need a browser

⚠️ Need a server

⚠️ Need to deal with network issues

⚠️ Test will be slower

⚠️ Need an extra dependency (Cypress/Selenium...)

⚠️ Need to learn extra dependency API​

## Expected Behaviors

1. Button starts in 'HotPink' state
2. Button starts with text that says 'Change to CornflowerBlue'
3. On click, button changes color to 'CornflowerBlue'
4. On click, button changes text that says 'Change to HotPink'
