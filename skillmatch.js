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

// simula

// finge em busca de uma vaga
function buscarVagas() {
  return new Promise(function (resolve, reject) {
    console.log("Buscando no banco de dados...");
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve(bancoDeVagas);
      } else {
        reject(new Error("A conexão ao banco de dados  falhou."));
      }
    }, 1500);
  });
}


async function main() {
  console.log("===== PROCURADOR DE VAGAS =====");
  console.log(candidato.nome + " - " + candidato.nivel + " - " + candidato.anosExperiencia + " ano de experiência");
  console.log("Habilidades: " + candidato.habilidades.join(", "));
  console.log(candidato.disponivel ? "Disponível pra começar agora" : "Precisa de aviso prévio");
  console.log("");

  let vagas = [];
  let tentativas = 0;

  // tento até 3 vezes 
  while (vagas.length === 0 && tentativas < 3) {
    tentativas++;
    try {
      const dados = await buscarVagas();
      vagas = dados.map(function (v) {
        return new VagaFrontEnd(v.empresa, v.cargo, v.requisitos, v.salario, v.modelo, v.diferenciais);
      });
      console.log("Deu certo na tentativa " + tentativas + ".\n");
    } catch (erro) {
      console.log("Tentativa " + tentativas + ": " + erro.message);
    }
  }

  if (vagas.length === 0) {
    console.log("Não consegui carregar as vagas. Tenta de novo mais tarde.");
    return;
  }

  // relatório da vaga
  const contador = criarContador();

  console.log(" Compatibilidade com cada vaga ");
  paraCadaVaga(vagas, function (vaga) {
    const nota = compatibilidade(vaga);
    const faltam = faltando(vaga);

    console.log(contador() + ") " + vaga.resumo());
    console.log("   " + nota + "% - " + classificar(nota));
    console.log("   " + (faltam.length === 0 ? "Você tem tudo!" : "Faltam: " + faltam.join(", ")));
    console.log("");
  });

  // vagas que paga que eu desejo
  const vagasBoas = vagas.filter((v) => v.salario >= candidato.pretensao);
  console.log("Vagas que pagam pelo menos R$ " + candidato.pretensao + ": " + vagasBoas.length + " de " + vagas.length);

  // procuro o que tem todo os requesitos
  const perfeita = vagas.find(atendeTudo);
  if (perfeita) {
    console.log("Você atende 100% da vaga da " + perfeita.empresa + ".");
  } else {
    console.log("Nenhuma vaga está 100% ainda.");
  }

  // mostra o melhor
  const melhor = melhorVaga(vagas);
  console.log("\n--- Melhor vaga pra você ---");
  console.log(melhor.resumo());
  console.log("Compatibilidade: " + compatibilidade(melhor) + "% (" + classificar(compatibilidade(melhor)) + ")");
  console.log("Recomendação: " + recomendar(melhor));
}

main();
