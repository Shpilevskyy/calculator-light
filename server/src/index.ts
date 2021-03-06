import express from "express";
import { calculateByMethod } from "src/calculator";

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/calculate", (req, res) => {
  try {
    const { expression, calculationMethod } = req.body;
    const result = calculateByMethod(expression, calculationMethod);

    res.json({ result });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
