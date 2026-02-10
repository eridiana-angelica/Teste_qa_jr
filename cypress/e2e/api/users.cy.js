describe("API - Users", () => {
  it("GET /api/user -> 200 e lista (array)", () => {
    cy.api("GET", "/api/user").then((res) => {
      expect(res.status).to.eq(200);

      cy.expectJsonHeaders(res);
      cy.expectCorsHeaders(res);

      expect(res.body).to.be.an("array");
    });
  });

  it("POST /api/user/create -> cria usuário (status, headers e body)", () => {
  // Payload igual ao frontend (observado no Network)
  const payload = {
    name: "Usuario Cypress API",
    email: "usuario.cypress@empresa",     // mantendo padrão que o sistema aceita hoje
    telephone: "81999999999",
    birth_date: "1995-05-10",             // YYYY-MM-DD
    birth_city: "Recife",
    companies: [4],                        // IDs numéricos (exatamente como o frontend)
  };

  cy.api("POST", "/api/user/create", payload).then((res) => {
   
    expect([200, 201]).to.include(res.status);

    cy.expectJsonHeaders(res);
    cy.expectCorsHeaders(res);

    // Body real observado
    expect(res.body).to.have.property("id_user");
    expect(String(res.body.id_user)).to.match(/^\d+$/);

    expect(res.body).to.have.property("name", payload.name);

    expect(res.body).to.have.property("email");
    expect(res.body.email).to.be.a("string");

    expect(res.body).to.have.property("telephone");
    expect(res.body.telephone).to.be.a("string");

    expect(res.body).to.have.property("birth_date");
    expect(res.body.birth_date).to.match(/^\d{4}-\d{2}-\d{2}$/);

    expect(res.body).to.have.property("birth_city");
    expect(res.body.birth_city).to.be.a("string");

    expect(res.body).to.have.property("companies");
    expect(res.body.companies).to.exist;
    });
  });

  it("GET /api/user/{id} inválido -> 400 ou 500", () => {
    cy.api("GET", "/api/user/invalid-id").then((res) => {
      expect([400, 500]).to.include(res.status);

      cy.expectJsonHeaders(res);
      cy.expectCorsHeaders(res);

      expect(res.body).to.exist;
    });
  });

  it("PATCH /api/user/{id}/update inválido -> 400 ou 500", () => {
    const payload = {
      name: "Novo Nome",
      "e-mail": "novo@empresa.com",
      companies: ["Empresa 3"],
    };

    cy.api("PATCH", "/api/user/invalid-id/update", payload).then((res) => {
      expect([400, 500]).to.include(res.status);

      cy.expectJsonHeaders(res);
      cy.expectCorsHeaders(res);

      expect(res.body).to.exist;
    });
  });

  it("DELETE /api/user/{id}/delete inválido -> 400 ou 500", () => {
    cy.api("DELETE", "/api/user/invalid-id/delete").then((res) => {
      expect([400, 500]).to.include(res.status);

      cy.expectJsonHeaders(res);
      cy.expectCorsHeaders(res);

      expect(res.body).to.exist;
    });
  });
});
