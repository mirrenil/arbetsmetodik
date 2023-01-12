import { cyan } from "@mui/material/colors";

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

describe("Sign in", () => {
    it("should sign in", () => {
        cy.visit("https://chubbydog.vercel.app/signin");
        cy.get("#email").type("cypress@test.com");
        cy.get("#password").get("#password").type("123456");
        cy.get("button").last().click();
        cy.location("pathname").should(
            "eq",
            "/profile/STTWxwUsR7eFK0xDyAOk1Tk7bmH2"
        );
    });
});

describe("Try to add a new listing when you are not signed in", () => {
    it("should say that you have to sign in", () => {
        cy.visit("https://chubbydog.vercel.app/newlisting");
        cy.get("h5"),
            (txt) => {
                expect(txt).to.contains(
                    "You need to be signed in to create a listing!"
                );
            };
    });
});

describe("Send a request to a listing when not signed in", () => {
    it("should display that you have to sign in to send a request", () => {
        cy.visit("https://chubbydog.vercel.app/items/0SSmO29vQiwx3zBvd1VD");
        cy.get("h6"),
            (txt) => {
                expect(txt).to.contains(
                    "You are not signed in, please sign in to be able to send a booking request"
                );
            };
    });
});
