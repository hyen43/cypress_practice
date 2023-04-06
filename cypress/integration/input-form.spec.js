describe("Input form", () => {
  // 각 테스트에 도달하기 전 먼저 시도하는 메서드
  beforeEach(() => {
    // 특정 페이지에 방문한다.
    // visit root site를 바라볼 수 있게 cypress.json에 작성
    cy.visit("/");
  });

  it("focuses input on load", () => {
    // 특정 요소에 포커스 한다.
    // 해당 요소에 autoFocus라는 속성이 필요하다.
    cy.focused().should("have.class", "new-todo");
  });

  // 해당 테스트만 하고 싶을 때 사용하는 api => only
  it("only accepts input", () => {
    const typeTest = "You do best!!";
    // type를 한 뒤에, input value에 해당 내용이 있는 지 확인
    cy.get(".new-todo").type(typeTest).should("have.value", typeTest);
  });

  // group or organize test
  context("Form submission", () => {
    beforeEach(() => {
      cy.server(); // start server
    });

    it("Adds a new todo on submit", () => {
      const itemText = "you can do everything";
      cy.route("POST", "/api/todos", {
        name: itemText,
        id: 1,
        isComplete: false,
      }); // handle request
      cy.get(".new-todo")
        .type(itemText)
        .type("{enter}")
        .should("have.value", "");
      cy.get(".todo-list li").should("have.length", 1).and("contain", itemText);
    });

    it("Show error on failed submission", () => {
      cy.route({
        url: "/api/todos",
        method: "POST",
        status: 500,
        response: {},
      }); // 실패케이스라 옵션만 작성

      cy.get(".new-todo").type("test{enter}"); // test를 타이핑 하고 엔터를 눌렀다.
      cy.get(".todo-list li").should("not.exist"); // 존재하지 않는다면
      cy.get(".error").should("be.visible"); // 지우자
    });
  });
});
