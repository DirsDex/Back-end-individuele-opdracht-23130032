const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Data met 13 drankjes
let drinks = [
  { "id": 1, "name": "Coca-Cola Original", "category": "Cola", "sugar": 35, "image": "images/coca_cola.jpg" },
  { "id": 2, "name": "Fanta Orange", "category": "Fruitdrank", "sugar": 33, "image": "images/fanta_orange.jpg" },
  { "id": 3, "name": "Sprite", "category": "Citrus", "sugar": 30, "image": "images/sprite.jpg" },
  { "id": 4, "name": "Pepsi Max", "category": "Cola", "sugar": 0, "image": "images/pepsi_max.jpg" },
  { "id": 5, "name": "Lipton Ice Tea", "category": "Thee", "sugar": 20, "image": "images/lipton.jpg" },
  { "id": 6, "name": "Rivella", "category": "Frisdrank", "sugar": 15, "image": "images/rivella.jpg" },
  { "id": 7, "name": "Spa Rood", "category": "Water", "sugar": 0, "image": "images/spa_rood.jpg" },
  { "id": 8, "name": "AA Drink", "category": "Sportdrank", "sugar": 25, "image": "images/aa_drink.jpg" },
  { "id": 9, "name": "Capri-Sun", "category": "Vruchtendrank", "sugar": 22, "image": "images/capri_sun.jpg" },
  { "id": 10, "name": "Red Bull", "category": "Energiedrank", "sugar": 27, "image": "images/red_bull.jpg" },
  { "id": 11, "name": "Crystal Clear", "category": "Lightdrank", "sugar": 1, "image": "images/crystal_clear.jpg" },
  { "id": 12, "name": "Minute Maid", "category": "Vruchtensap", "sugar": 24, "image": "images/minute_maid.jpg" },
  { "id": 13, "name": "7UP", "category": "Citrus", "sugar": 31, "image": "images/7up.jpg" }
];

//Alle drankjes ophalen
app.get('/drinks', (req, res) => {
  res.json(drinks);
});

//Één drankje ophalen op ID
app.get('/drinks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const drink = drinks.find(d => d.id === id);
  if (drink) {
    res.json(drink);
  } else {
    res.status(404).json({ error: "Drankje niet gevonden" });
  }
});

//Nieuw drankje toevoegen
app.post('/drinks', (req, res) => {
  const maxId = Math.max(...drinks.map(d => d.id), 0);
  const newDrink = {
    id: maxId + 1,
    ...req.body
  };
  drinks.push(newDrink);
  res.status(201).json(newDrink);
});

//Drankje aanpassen
app.put('/drinks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = drinks.findIndex(d => d.id === id);
  if (index !== -1) {
    drinks[index] = { id, ...req.body };
    res.json(drinks[index]);
  } else {
    res.status(404).json({ error: "Drankje niet gevonden" });
  }
});

//Drankje verwijderen
app.delete('/drinks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = drinks.findIndex(d => d.id === id);
  if (index !== -1) {
    const deleted = drinks.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: "Drankje niet gevonden" });
  }
});

// 🟢 Server starten
app.listen(port, () => {
  console.log(`Drinks API draait op http://localhost:${port}`);
});
