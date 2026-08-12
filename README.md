# SkillMatch - Simulador de Compatibilidade com Vagas Front-End Júnior

## O que o sistema faz

É um simulador de compatibilidade com vagas Front-End Júnior que:

- Compara as habilidades do candidato com os requisitos de 4 vagas
- Calcula % de compatibilidade e classifica (Alta/Média/Baixa)
- Recomenda o que estudar e indica a melhor vaga
- Simula busca assíncrona com retry (Promise + async/await)

## Como executar (do zero)

```bash
# 1. Instale Node.js (se não tiver): https://nodejs.org
# 2. Salve o código como skillmatch.js
# 3. Rode no terminal:
node skillmatch.js
```

## Regra de cálculo da compatibilidade

**Fórmula:** `(habilidades que o candidato TEM ∩ requisitos da vaga) / total de requisitos × 100`

**Por que:** É direta, transparente e reflete a cobertura real dos requisitos obrigatórios. Não pesa diferenciais (são bônus, não bloqueadores).

## Critério de priorização nas recomendações

- **Requisitos obrigatórios faltantes** → prioridade máxima (bloqueiam a candidatura)
- **Diferenciais da vaga** → só aparecem se o candidato já atende 100% dos requisitos (são para "se destacar")

## Conceitos do Módulo 01 aplicados

| Conceito | Onde aparece |
|----------|--------------|
| Variáveis/const/let | (var  no loop) |
| Arrays e métodos | filter, map, reduce, find, join, every, includes |
| Funções | faltando, compatibilidade, classificar, recomendar, melhorVaga, criarContador, paraCadaVaga |
| Arrow functions | setTimeout(() => ...), vagas.filter(v => ...) |
| Classes + Herança | class Vaga + class VagaFrontEnd extends Vaga 
| Closure | criarContador retorna função que captura numero 
| Callback | paraCadaVaga(lista, callback) 
| Promise + async/await | buscarVagas() + await buscarVagas() no main() 
| Try/catch | Tratamento de erro na busca 
| Template strings | console.log(`...${var}...`) implícito via concatenação |

## Arquitetura cliente-servidor no projeto

**Conceito:** Modelo onde o cliente faz requisições e o servidor responde com dados/serviços.

**No código:**

- **Cliente:** A função `main()` / `buscarVagas()` — quem consome os dados
- **Servidor (simulado):** `bancoDeVagas` + `buscarVagas()` com `setTimeout` + `Promise` — quem fornece os dados com latência e falha aleatória
- **Comunicação:** Assíncrona via Promise (simula HTTP request/response)
- **Retry:** Loop `while` com 3 tentativas = resiliência do cliente
- link do video https://youtu.be/nY0VazFuPhI
- link do trello https://trello.com/invite/b/6a794bc07ea34afac3609331/ATTI9656e240e19a02733818f5fda7b969268964C8AC/mini-projeto
