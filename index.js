import express from "express";

const app = express();
const port = 3001;
app.use(express.json());

let textData = [];
let nextId = 1;

// Add a new tea
app.post("/teas", (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    textData.push(newTea);
    res.status(201).send(newTea);
});

// Show all teas
app.get("/teas", (req, res) => {
    res.status(200).send(textData);
});

// Show a specific tea by ID
app.get("/teas/:id", (req, res) => {
    const tea = textData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    res.status(200).send(tea);
});

// Update a tea
app.put("/teas/:id", (req, res) => {
    const tea = textData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
});

// Delete a tea
app.delete("/teas/:id", (req, res) => {
    const index = textData.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send("Tea not found");
    }
    textData.splice(index, 1);
    return res.status(204).send("Delete Successful");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
