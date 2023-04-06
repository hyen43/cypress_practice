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
});
