describe("API - Companies", () => {
  it("GET /api/company retorna lista", () => {
    cy.api("GET", "/api/company").then((res) => {
      expect(res.status).to.eq(200);
      cy.expectJsonHeaders(res);
      expect(res.body).to.be.an("array");
    });
  });
});
