describe("Login", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | Uber Eats");
  });
  it("can see email/password validation errors", () => {
    cy.visit("/");
    cy.findByPlaceholderText(/email/i).type("bad@email");
    cy.findByRole("alert").should("have.text", "Please enter a valid email");
    cy.findAllByPlaceholderText(/email/i).clear();
    cy.findByRole("alert").should("have.text", "Email is required");
    cy.findByPlaceholderText(/email/i).type("dorofeev861@yahoo.com");
    cy.findByPlaceholderText(/password/i)
      .type("a")
      .clear();
    cy.findByRole("alert").should("have.text", "Password is required");
  });
  it("can fill out the form and login", () => {
    // @ts-ignore
    cy.login("doro@yahoo.com", "12345");
  });
});
