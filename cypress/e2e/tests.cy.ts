describe("Try to sign up with invalid credentials", () => {
  it("should show an error message", () => {
    cy.visit("https://chubbydog.vercel.app/signup");
    cy.get("#email").type("hej@gmail.com");
    cy.get("#displayName").type("hej");
    cy.get("#password").type("123456");
    cy.get("#password").type("111111");
    cy.get("Button").last().click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Passwords do not match");
    });
  });
});

describe("Check if the images has alt texts", () => {
  it("should contain alt text", () => {
    cy.visit("https://chubbydog.vercel.app/");
    cy.get("img").first().should("have.attr", "alt");
  });
});
