const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Server hidup');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
