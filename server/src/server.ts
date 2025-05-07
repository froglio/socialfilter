import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { spawn } from "child_process";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota para geração de filtros avançados
app.post("/generate-filters", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt é obrigatório." });
  }

  try {
    const context = `
      Aja como um especialista em Social Listening e monitoramento de redes sociais. Dado um pedido de busca feito por um analista, gere uma lista de palavras-chave e uma ou mais expressões booleanas (filtros) que poderiam ser usadas para encontrar publicações no X (antigo Twitter) relacionadas ao pedido.
      
      -> Extraia a entidade de interesse (empresa, marca, produto, pessoa, etc.);
      -> Identifique o sentimento buscado (elogios, críticas, sugestões, etc.);
      -> Liste variações de linguagem natural que representam esse sentimento;
      -> Gere de 3 a 5 filtros avançados com operadores booleanos do X, no formato:
      (palavra1 OR "frase exata" OR palavra2) AND entidade since:AAAA-MM-DD until:AAAA-MM-DD lang:pt

      Entrada do usuário: {input_do_usuário}

      Retorne:
      * Filtros sugeridos

      Nunca inclua explicações ou outras coisas que não sejam exatamente o retorno esperado.
      Não adicione elementos como *, -, + ou outros caracteres especiais.
      Não adicione aspas ou parênteses desnecessários.
      Não adicione quebras de linha ou espaços desnecessários.
      Não adicione informações adicionais ou contexto.
      Não adicione informações sobre o que você está fazendo ou como você está fazendo.
    `;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: context,
          },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const rawFilters = response.data.choices[0].message.content;
    const filters = rawFilters
      .split("\n")
      .map((filter) => filter.trim())
      .filter((filter) => filter);
    res.json({ filters });
  } catch (error) {
    console.error("Erro ao chamar a API do Groq:", error);
    res.status(500).json({ error: "Erro ao gerar filtros." });
  }
});

// Rota para retornar publicações usando script Python com twscrape
app.post("/scrape", async (req, res) => {
  const { filter } = req.body;

  if (!filter) {
    return res.status(400).json({ error: "Filtro inteligente é obrigatório." });
  }

  try {
    // Executar o script Python para obter as URLs
    console.log("Executando o script Python com o filtro:", filter);
    const request = spawn("python3", ["scripts/twitter_scraper.py", filter], {
      timeout: 60000,
    });

    let dataBuffer = "";

    request.stdout.on("data", (data) => {
      dataBuffer += data.toString();
    });

    request.on("close", async (code) => {
      try {
        const posts = JSON.parse(dataBuffer);
        res.json({ posts });
      } catch (err) {
        console.error("Erro ao parsear JSON:", err);
        return res.status(500).send("Erro ao processar resposta do Python");
      }
    });
  } catch (error) {
    console.error("Erro geral:", error);
    res.status(500).json({ error: "Erro inesperado." });
  }
});

app.listen(PORT, () => {
  console.log(`Running: http://localhost:${PORT}`);
});
