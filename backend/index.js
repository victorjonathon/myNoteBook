const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
//app.use(express.static('./public'));

//Routes
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/notes/', require('./routes/notes'));
app.use('/api/common/', require('./routes/common'));

app.listen(port, () => {
    console.log(`myNoteBook App listening on port: ${port}`);
});