require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", routes);

// rota de health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(
    `Documentação disponível em http://localhost:${PORT}/api-docs`,
  );
});
