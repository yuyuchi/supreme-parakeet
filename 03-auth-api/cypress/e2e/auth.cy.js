it("return 200 when we hit /register", () => {
  let body = {
    name: "TestName",
    email: "foo@bar.com",
    password: "Test0987",
  };
  cy.request("POST", "http://localhost:3000/api/user/register", body).then(
    (response) => {
      expect(response.status).to.eq(200);
    }
  );
});

it("return 400 when we hit /register with nobody", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/api/user/register",
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(400);
  });
});
