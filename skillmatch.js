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

// lógica do principio

// ainda não tenho
function faltando(vaga) {
  return vaga.requisitos.filter((req) => !candidato.habilidades.includes(req));
}

// ve o requisito que eu tenho
function compatibilidade(vaga) {
  const tenho = vaga.requisitos.filter((req) => candidato.habilidades.includes(req));
  return Math.round((tenho.length / vaga.requisitos.length) * 100);
}

function classificar(nota) {
  if (nota >= 80) {
    return "Alta";
  } else if (nota >= 50) {
    return "Média";
  } else {
    return "Baixa";
  }
}

// ve se eu estou 100%
function atendeTudo(vaga) {
  return vaga.requisitos.every((req) => candidato.habilidades.includes(req));
}

// a recomendação vai mudar de acordo com seus criterios
function recomendar(vaga) {
  const nota = compatibilidade(vaga);
  const faltam = faltando(vaga);
  let texto;

  switch (classificar(nota)) {
    case "Alta":
      texto = "Falta pouco, pode se candidatar.";
      break;
    case "Média":
      texto = "Dá pra tentar, mas estude o que falta antes.";
      break;
    default:
      texto = "Melhor estudar mais antes de tentar essa.";
  }

  // es tudar o que fauta
  if (faltam.length === 0) {
    return texto + " Diferenciais pra se destacar: " + vaga.diferenciais.join(", ") + ".";
  }

  return texto + " Estudar: " + faltam.join(", ") + ".";
}

// melhor vaga de todas vai redusindo e guardando a maior nota
function melhorVaga(lista) {
  return lista.reduce(function (melhor, vaga) {
    return compatibilidade(vaga) > compatibilidade(melhor) ? vaga : melhor;
  });
}

// closure: ele conta e acumula
function criarContador() {
  let numero = 0;
  return function () {
    numero++;
    return numero;
  };
}

// callback: ele decide o que fazer com a vaga
function paraCadaVaga(lista, callback) {
  // usei var aqui só de propósito, é o jeito antigo de declarar (hoje uso let)
  for (var i = 0; i < lista.length; i++) {
    callback(lista[i]);
  }
}
