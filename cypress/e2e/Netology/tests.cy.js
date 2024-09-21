describe('Work with book', () => {
  beforeEach(() => {
    cy.visit("");
    cy.login("test@test.com", "test");
  });

  it("Add the book to favourites", () => {
    cy.wait(1000);
    cy.get('body').then(($body) => {
      if ($body.find('a.mt-3 .btn-success').length === 0) {
        cy.createBook('Test book', 'Test book');
      }
    });
    cy.get("a.mt-3 .btn-success").first().click();
    cy.get("a.mt-3").filter(':has(.btn-secondary)').last().invoke('attr', 'href').then((favoriteBookHref) => {
      cy.get('h4').click()
      cy.get(`a[href="${favoriteBookHref}"]`).should('exist');
    })
  });

  it("Open a book from favourites", () => {
    cy.get('h4').click()

    cy.get("a.mt-3 div.card-title").first().invoke('text').then((bookTitle) => {
      cy.get("a.mt-3 div.card-title").first().click();
      cy.get(".col-md-7 h2").should("contain.text", bookTitle);
    });
  });

  it("Removing a book from favourites", () => {
    cy.get('h4').click()

    cy.get("a.mt-3").then(($books) => {
      const count = $books.length;
      cy.get("a.mt-3 .btn-secondary").first().click();
      cy.get("a.mt-3").should("have.length", count - 1);
    });
  });
})

describe('Login', () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("Should successfully login", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.login(null, "test");
    cy.validEmpty("#mail", "Заполните это поле.")
  });

  it("Should not login with empty password", () => {
    cy.login("test@test.com", null);
    cy.validEmpty("#pass", "Заполните это поле.")
  });
})