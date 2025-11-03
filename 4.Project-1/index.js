const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app
.route('/api/users/:id')
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user)})

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  // update only provided fields
  users[userIndex] = { ...users[userIndex], ...body };

  // write updated data back to file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Failed to update file" });
    }

    res.json({ status: "success", user: users[userIndex] });
  });
});

  
app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  users.splice(userIndex, 1); // remove the user

  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Failed to update file" });
    }
    res.json({ status: "success", message: "User deleted successfully" });
  });
});



app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>`;
    res.send(html);
})


app.get('/api/users', (req, res) => {
    return res.json(users);
});


app.post('/api/users', (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Failed to write file" });
    }
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)

})