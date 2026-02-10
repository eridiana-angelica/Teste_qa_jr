describe("E2E - Fluxos críticos UI frontend", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5400/");
  });

  it("E2E-01 - Cadastrar usuário com sucesso (1 empresa)", () => {
    const unique = Date.now();

    
    cy.get("#new-user").click();
    cy.contains("Cadastrar novo usuário").should("be.visible");

    
    cy.get('input[placeholder="Nome"]').type(`Usuário ${unique}`);
    cy.get('input[placeholder="Email"]').type(`Usuário${unique}@empresa.com`);
    cy.get('input[placeholder="Telefone"]').type("81999999999");
    cy.get('input[placeholder="Cidade de nascimento"]').type("São Paulo");
    // Campo do tipo date exige formato YYYY-MM-DD
    cy.get('input[placeholder="Data de nascimento"]').type("1995-05-10");


    cy.get("#search_input").click();
    cy.contains("li.option", "Empresa 1").click();

    cy.contains("Cadastrar novo usuário").click();
    
    cy.contains("Salvar").click();

   
    cy.contains(`Usuário ${unique}`, { timeout: 10000 }).should("be.visible");
    cy.contains(`Usuário${unique}@empresa.com`).should("be.visible");
  });

  it('E2E-02 - Validar obrigatório: salvar com "Nome" vazio exibe "Preencha este campo."', () => {
    const unique = Date.now();

    cy.get("#new-user").click();
    cy.contains("Cadastrar novo usuário").should("be.visible");

    // Não preenche Nome
    cy.get('input[placeholder="Email"]').type(`Usuário${unique}@empresa.com`);
    cy.get('input[placeholder="Telefone"]').type("81999999999");
    cy.get('input[placeholder="Cidade de nascimento"]').type("Rio de Janeiro");
    // Campo do tipo date exige formato YYYY-MM-DD
    cy.get('input[placeholder="Data de nascimento"]').type("2001-11-30");


    cy.get("#search_input").click();
    cy.contains("li.option", "Empresa 2").click();

    cy.contains("Cadastrar novo usuário").click();
    
    cy.contains("Salvar").click();


    cy.get('input[placeholder="Nome"]').then(($input) => {
      expect($input[0].validationMessage).to.contain("Preencha este campo");
    });

  
    cy.contains("Cadastrar novo usuário").should("be.visible");
  });

  it("E2E-03 - Selecionar múltiplas empresas (3) e cadastrar", () => {
    const unique = Date.now();

    cy.get("#new-user").click();
    cy.contains("Cadastrar novo usuário").should("be.visible");

    cy.get('input[placeholder="Nome"]').type(`Usuário${unique}`);
    cy.get('input[placeholder="Email"]').type(`Usuário${unique}@empresa.com`);
    cy.get('input[placeholder="Telefone"]').type("81988887777");
    cy.get('input[placeholder="Cidade de nascimento"]').type("Curitiba");
   // Campo do tipo date exige formato YYYY-MM-DD
    cy.get('input[placeholder="Data de nascimento"]').type("1987-09-27");


    cy.get("#search_input").click();
    cy.contains("li.option", "Empresa 1").click();
    cy.contains("li.option", "Empresa 2").click();
    cy.contains("li.option", "Empresa 3").click();


    cy.contains("Salvar").click();

    cy.contains(`Usuário${unique}`, { timeout: 10000 }).should("be.visible");
    cy.contains(`Usuário${unique}@empresa.com`).should("be.visible");
  });
it('E2E-04 - Validar obrigatório: salvar com "Email" vazio exibe "Preencha este campo."', () => {
  const unique = Date.now();

  cy.get("#new-user").click();
  cy.contains("Cadastrar novo usuário").should("be.visible");


  cy.get('input[placeholder="Nome"]').type(`Usuário Teste ${unique}`);
  // Não preenche Email
  cy.get('input[placeholder="Telefone"]').type("81999999999");
  cy.get('input[placeholder="Cidade de nascimento"]').type("Fortaleza");
  // Campo do tipo date exige formato YYYY-MM-DD
  cy.get('input[placeholder="Data de nascimento"]').type("1999-03-18");

  
  cy.get("#search_input").click();
  cy.contains("li.option", "Empresa 2").click();


  cy.contains("Cadastrar novo usuário").click();

  cy.contains("Salvar").click();

  
  cy.get('input[placeholder="Email"]').then(($input) => {
    expect($input[0].validationMessage).to.contain("Preencha este campo");
  });


  cy.contains("Cadastrar novo usuário").should("be.visible");
});

it("E2E-05 - Cadastrar usuário com sucesso selecionando 2 empresas", () => {
  const unique = Date.now();

  cy.get("#new-user").click();
  cy.contains("Cadastrar novo usuário").should("be.visible");

  cy.get('input[placeholder="Nome"]').type(`Usuário 2 Empresas ${unique}`);
  cy.get('input[placeholder="Email"]').type(`usuario2emp.${unique}@empresa.com`);
  cy.get('input[placeholder="Telefone"]').type("81988887777");
  cy.get('input[placeholder="Cidade de nascimento"]').type("Maceio");
  // Campo do tipo date exige formato YYYY-MM-DD
  cy.get('input[placeholder="Data de nascimento"]').type("1993-01-31");

  
  cy.get("#search_input").click();
  cy.contains("li.option", "Empresa 1").click();
  cy.contains("li.option", "Empresa 3").click();

  
  cy.contains("Cadastrar novo usuário").click();

  cy.contains("Salvar").click();

  
  cy.contains(`Usuário 2 Empresas ${unique}`, { timeout: 10000 }).should("be.visible");
  cy.contains(`usuario2emp.${unique}@empresa.com`).should("be.visible");
});
});