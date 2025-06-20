const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Data met 13 drankjes
let drinks = [
  { "id": 1, "name": "Coca-Cola", "category": "Cola", "sugar": 30, "image": "images/coca_cola.jpg" },
  { "id": 2, "name": "Coca-Cola Zero", "category": "Cola", "sugar": 0, "image": "images/coca_cola_zero.jpg" },
  { "id": 3, "name": "Pepsi Max", "category": "Cola", "sugar": 0, "image": "images/pepsi_max.jpg" },
  { "id": 4, "name": "Fanta Orange", "category": "Fruitdrank", "sugar": 33, "image": "images/fanta_orange.jpg" },
  { "id": 5, "name": "Fanta Exotic", "category": "Fruitdrank", "sugar": 32, "image": "images/fanta_exotic.jpg" },
  { "id": 6, "name": "Sprite", "category": "Citroen/Limoen", "sugar": 28, "image": "images/sprite.jpg" },
  { "id": 7, "name": "7UP", "category": "Citroen/Limoen", "sugar": 27, "image": "images/7up.jpg" },
  { "id": 8, "name": "Dr. Pepper", "category": "Special", "sugar": 40, "image": "images/dr_pepper.jpg" },
  { "id": 9, "name": "Mountain Dew", "category": "Special", "sugar": 46, "image": "images/mountain_dew.jpg" },
  { "id": 10, "name": "Lipton Ice Tea", "category": "Thee", "sugar": 21, "image": "images/lipton.jpg" },
  { "id": 11, "name": "Red Bull", "category": "Energie", "sugar": 27, "image": "images/red_bull.jpg" },
  { "id": 12, "name": "Monster Energy", "category": "Energie", "sugar": 54, "image": "images/monster.jpg" },
  { "id": 13, "name": "Royal Club Tonic", "category": "Bitter", "sugar": 18, "image": "images/tonic.jpg" }
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
    res.status(404).json({ error: "Drankje kan niet aangepast worden ID niet gevonden" });
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
    res.status(404).json({ error: "ID nummer niet gevonden van drankje" });
  }
});

// 🟢 Server starten
app.listen(port, () => {
  console.log(`Drinks API draait op http://localhost:${port}`);
});
