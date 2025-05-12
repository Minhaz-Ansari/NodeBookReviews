const express = require('express');
const app = express();

const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');


app.use(express.json()); 

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
