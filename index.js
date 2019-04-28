const express = require('express');
const path = require('path');
const app = express();
const rootRouter = require('./routes/root');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded( {extended: false }));
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/', rootRouter); 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${ port }`));