import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { spawn } from "child_process";
import fs from "fs";
import archiver from "archiver";
import puppeteer from "puppeteer";

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

// Rota para capturar screenshots e gerar arquivo ZIP
app.post("/download-posts", async (req, res) => {
  const { posts } = req.body;

  if (!posts || !Array.isArray(posts)) {
    return res
      .status(400)
      .json({ error: "posts são obrigatórias e devem ser um array." });
  }

  const screenshotsDir = "./temp_screenshots";
  const zipPath = "./screenshots.zip";

  try {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const [index, post] of posts.entries()) {
      const { content, date } = post;
      const filePath = `${screenshotsDir}/post_${index + 1}.png`;

      await page.setContent(
        `
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              }
              #card {
                width: 600px;
                border: 1px solid #ddd;
                padding: 10px;
                margin: 10px;
              }
              h3 {
                font-size: 18px;
                color: black;
                margin: 0;
              }
              .footer {
                display: flex;
                margin-top: 16px;
              }
              p {
                font-size: 18px;
                color: #555;
                margin: 0;
              }
            </style>
          </head>
          <body>
            <div id="card">
              <h3>${content}</h3>
              <div class="footer">
                <p>${date}</p>
              </div>
            </div>
          </body>
        </html>
      `,
        { waitUntil: "load" }
      );

      // Capturar apenas o tamanho do card
      const cardElement = await page.$("#card");
      cardElement && (await cardElement.screenshot({ path: filePath }));
    }

    await browser.close();

    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 1 } });

    archive.pipe(output);

    archive.directory(screenshotsDir, false);

    await archive.finalize();

    output.on("close", () => {
      if (!fs.existsSync(zipPath)) {
        console.error("Arquivo ZIP não encontrado.");
        return res.status(500).json({ error: "Arquivo ZIP não encontrado." });
      }

      res.download(zipPath, "screenshots.zip", (err) => {
        if (err) {
          console.error("Erro ao enviar o arquivo ZIP:", err);
          return res
            .status(500)
            .json({ error: "Erro ao enviar o arquivo ZIP." });
        }

        // Remover arquivos temporários após o download
        fs.rmSync(screenshotsDir, { recursive: true, force: true });
        fs.unlinkSync(zipPath);
      });
    });
  } catch (error) {
    console.error("Erro ao capturar screenshots ou gerar ZIP:", error);
    res
      .status(500)
      .json({ error: "Erro ao capturar screenshots ou gerar ZIP." });
  }
});

app.listen(PORT, () => {
  console.log(`Running: http://localhost:${PORT}`);
});
