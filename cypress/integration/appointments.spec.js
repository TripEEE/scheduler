describe("Navigation", () => {
  beforeEach(() => { //ensures database is reset and loaded before we run tests
    cy.request("GET", "/api/debug/reset") //reset database

    cy.visit("/") //visit root
    cy.contains("Monday") //confirm it contains text
  })

  it("should book an interview", () => { //start running book an interview test
    cy.get("[alt=Add]") //find element with alt=Add value
      .first() //since there are 2 such elements, get the first one
      .click(); //click it

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones") //types student name into input
    cy.get("[alt='Sylvia Palmer']").click(); //clicks on interviewer

    cy.contains("Save").click() //click the Save button

    cy.contains(".appointment__card--show", "Lydia Miller-Jones"); //verifies the student in the booked appointment
    cy.contains(".appointment__card--show", "Sylvia Palmer");//verifies the interviewer in the booked appointment
  })

  it("should edit an interview", () => {
    cy.get("[alt=Edit]") //clicks edit of existing appointment
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones"); //clears and adds student name
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones"); //appointment has new student name
    cy.contains(".appointment__card--show", "Tori Malcolm");//appointment has new interviewer name
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });  //clicks delete button

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen") //checks appointment is empty
      .should("not.exist");
  });
})