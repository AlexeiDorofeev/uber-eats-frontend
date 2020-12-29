describe("Create Account", () => {
  it("should see email / password validation errors", () => {
    cy.visit("/");
    cy.findByText(/create an account/i).click();
    cy.findByPlaceholderText(/email/i).type("not@good");
    cy.findByRole("alert").should("have.text", "Please enter a valid email");
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByRole("alert").should("have.text", "Email is required");
    cy.findByPlaceholderText(/email/i).type("real@mail.com");
    cy.findByPlaceholderText(/password/i)
      .type("a")
      .clear();
    cy.findByRole("alert").should("have.text", "Password is required");
  });
  it("should be able to create account and login", () => {
    cy.intercept("http://localhost:4000/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === "createAccountMutation") {
        req.reply((res) => {
          res.send({
            fixture: "auth/create-account.json",
          });
        });
      }
    });
    cy.visit("/create-account");
    cy.findByPlaceholderText(/email/i).type("doro@yahoo.com");
    cy.findByPlaceholderText(/password/i).type("12345");
    cy.findByRole("button").click();
    cy.wait(1000);
    // @ts-ignore
    cy.login("doro@yahoo.com", "12345");
  });
});
