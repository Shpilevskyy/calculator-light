import express from "express";
// @ts-ignore
import { calculateByMethod } from "./src/calculator.ts";

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/calculate", (req, res) => {
  const { expression, calculationMethod } = req.body;

  res.json({ result: calculateByMethod(expression, calculationMethod) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
