// SkillMatch JS - Simulador de Compatibilidade com Vaga Front-End Júnior

//  dados do candidato
const candidato = {
  nome: "Eniere Benedito de freiras",
  nivel: "Júnior",
  anosExperiencia: 1,
  habilidades: ["HTML", "CSS", "JavaScript", "Git", "Responsividade", "React"],
  pretensao: 2800,
  disponivel: true
};

// vagas que estão disponiveis
const bancoDeVagas = [
  {
    empresa: "TechSolutions",
    cargo: "Front-End Júnior",
    salario: 3000,
    modelo: "Remoto",
    requisitos: ["HTML", "CSS", "JavaScript", "Git", "Responsividade"],
    diferenciais: ["React", "TypeScript"]
  },
  {
    empresa: "DataSoft",
    cargo: "Desenvolvedor Front-End Júnior",
    salario: 2400,
    modelo: "Híbrido",
    requisitos: ["HTML", "CSS", "JavaScript", "Git", "Consumo de APIs", "Sass"],
    diferenciais: ["React", "Jest"]
  },
  {
    empresa: "StartupNinja",
    cargo: "Desenvolvedor Web Júnior",
    salario: 2600,
    modelo: "Presencial",
    requisitos: ["HTML", "CSS", "JavaScript", "Git", "SEO básico", "TypeScript", "Testes"],
    diferenciais: ["Next.js"]
  },
  {
    empresa: "StellarApp",
    cargo: "Front-End Júnior (design)",
    salario: 3500,
    modelo: "Remoto",
    requisitos: ["HTML", "CSS", "JavaScript", "Tailwind", "Figma", "Consumo de APIs", "TypeScript"],
    diferenciais: ["Acessibilidade"]
  }
];

// classes 

// serve pra qualquer vaga
class Vaga {
  constructor(empresa, cargo, requisitos) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
  }

  resumo() {
    return this.cargo + " - " + this.empresa;
  }
}

// herança: da vaga
class VagaFrontEnd extends Vaga {
  constructor(empresa, cargo, requisitos, salario, modelo, diferenciais) {
    super(empresa, cargo, requisitos);
    this.salario = salario;
    this.modelo = modelo;
    this.diferenciais = diferenciais;
  }

  resumo() {
    return super.resumo() + " | R$ " + this.salario + " | " + this.modelo;
  }
}
