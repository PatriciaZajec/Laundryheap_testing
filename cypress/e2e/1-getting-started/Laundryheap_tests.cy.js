/// <reference types="cypress" />

describe('Laundryheap app flow test', () => {

    it("should open Laundryheap website" , () => {
        cy.visit("https://staging-new.laundryheap.co.uk/")
        cy.get(".lh-nav--cta").contains('a', 'Book now').should("be.visible");
    })

    it("should open Booking page", () => {

        cy.get(".lh-nav--cta").contains('a', 'Book now').click()
        cy.get(".booking-address").should("be.visible");
    })

    it("should choose 'Don't know your postcode' option", () => {

        cy.get(".input-note").contains('span',"Don't know your postcode?").click();
        cy.get("#addressSearch").invoke('attr', 'placeholder').should('contain', 'Search for address or building');
    })


    it("should fill address information", () => {

        var address = "Kingston upon Thame";

        cy.get("#addressSearch").type(address);
        cy.get(".autocomplete-results").children().eq(0).click();
        cy.get("#addressSearch").should("have.value", address);
    })

    it("should Collection and delivery screen be visible", () => {

        cy.get(".booking-summary--header").get('[type="button"]').click();
        cy.get(".booking-timeslots").should("contain","Collection & delivery" );    
    })

    it("should add Wash option on 'What services do you need?' screen", () => {

        cy.get(".booking-summary--header").contains('div', ' Next ').click();
        cy.wait(5000)
        cy.get(".service-wrapper")
          .get(".servcice-main-button").eq(0).click();
        cy.get(".modal--body").contains('p',' Separate Wash ').click();
        cy.get(".modal--footer").contains('div', ' Add service ').click();
        cy.get(".service-wrapper.active").contains("Remove" ).should("be.visible"); 
    })

    it("should fill field on Contact screen", () => {

        var firstName = "test";
        var lastName = "test";
        var timeStamp = Date.now();


        cy.get(".booking-summary--header").contains('div', ' Next ').click();

        cy.get("#firstName").type(firstName);
        cy.get("#lastName").type(lastName);

        cy.wait(2000)
      
        cy.get("select").select("+386");
        cy.get("#phoneBody").type(timeStamp);
        cy.get("#email").type("zajecpatricia+" + timeStamp + "@gmail.com");
        
    })

    it("should fill Payment info", () => {
        cy.get(".booking-summary--header").contains('div', ' Next ').click();
        cy.wait(2000)

        cy.get("#card-number").click();  
        cy.get("#card-number").invoke('show');
        
        //cy.fillElementsInput('cardNumber', '4242424242424242');
    })
    



})