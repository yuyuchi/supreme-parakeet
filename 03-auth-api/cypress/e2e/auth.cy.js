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

  // positive test
  it("creates user with valid body", () => {
    let body = {
      name: "TestName",
      email: "foo@bar.com",
      password: "Test0987",
    };
    cy.request("POST", registerEndpoint, body).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("TestName");
      expect(response.body.email).to.eq("foo@bar.com");
      expect(response.body.password).to.eq("Test0987");
    });
  });
});
