describe("/user/register", () => {
  const registerEndpoint = "http://localhost:3000/api/user/register";
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

  it("return 400 when we hit /register with nobody", () => {
    cy.request({
      method: "POST",
      url: registerEndpoint,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
