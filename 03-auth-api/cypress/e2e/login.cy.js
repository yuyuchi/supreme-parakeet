describe("/user/login", () => {
  const loginEndpoint = "http://localhost:3000/api/user/login";

  it("login with valid user", () => {
    let staticUser = {
      email: "doNotDeleteUser@email.com",
      password: "validPassword",
    };
    cy.request({
      method: "POST",
      url: loginEndpoint,
      body: staticUser,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
