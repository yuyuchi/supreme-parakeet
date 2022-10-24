const Guid = require("guid");

describe("/user/register", () => {
  const registerEndpoint = "http://localhost:3000/api/user/register";

  it("return 400 when we hit /register with nobody", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("doesnt allow user creation with bad user body", () => {
    let badTestUser = {
      name: "1",
      email: "foo",
      password: "1",
    };
    cy.request({
      method: "POST",
      url: registerEndpoint,
      body: badTestUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("doesnt allow user creation with invalid email", () => {
    let badTestUser = {
      name: "ValidName",
      email: "invalidEmail",
      password: "validPassword",
    };
    cy.request({
      method: "POST",
      url: registerEndpoint,
      body: badTestUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq(`"email" must be a valid email`);
    });
  });

  it("cant create duplicate user", () => {
    let goodTestUser = {
      name: "ValidName",
      email: "doNotDeleteUser@email.com",
      password: "validPassword",
    };
    cy.request({
      method: "POST",
      url: registerEndpoint,
      body: goodTestUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq("Email already registered");
    });
  });

  // positive test
  it("creates user with valid body", () => {
    let dynamicEmail = Guid.raw() + "@bar.com";
    let body = {
      name: "TestName",
      email: dynamicEmail,
      password: "Test0987",
    };
    cy.request("POST", registerEndpoint, body).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("TestName");
      expect(response.body.email).to.eq(dynamicEmail);
      expect(response.body.password).to.eq("Test0987");
    });
  });
});
