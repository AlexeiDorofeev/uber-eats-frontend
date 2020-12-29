describe("Login", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | Uber Eats");
  });
  it("can fill out the form", () => {
    cy.visit("/");
    cy.findByPlaceholderText(/email/i).type("dorofeev86@yahoo.com");
    cy.findByPlaceholderText(/password/i).type("12345");
    cy.findByRole("button").should("not.have.class", "pointer-events-none");
  });
  it("can see email/password validation errors", () => {
    cy.visit("/");
    cy.findByPlaceholderText(/email/i).type("bad@email");
    cy.findByRole("alert").should("have.text", "Please enter a valid email");
  });
});
