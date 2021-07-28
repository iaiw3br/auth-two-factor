const express = require('express');
const app = express();


app.use(express.json());
app.set('view engine', 'ejs');
require('./src/routes').registrationRoutes(app);

app.get('/', (req, res) => {
   res.send('Hello');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
