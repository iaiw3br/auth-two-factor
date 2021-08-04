const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
require('./routes').registrationRoutes(app);

app.get('/', (req, res) => {
   res.send('Hello');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
