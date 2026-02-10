describe("API - Home", () => {
  it("GET / deve retornar 200 e body correto", () => {
    cy.api("GET", "/").then((res) => {
      expect(res.status).to.eq(200);
      cy.expectJsonHeaders(res);
      cy.expectCorsHeaders(res);
      expect(res.body).to.deep.equal({ msg: "home" });
    });
  });
});