const express = require('express');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profile');
const articlesRoutes = require('./routes/articles');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', profileRoutes);
app.use('/api', articlesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});