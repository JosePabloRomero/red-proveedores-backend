const express = require('express');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(routes);


const PORT = 3002
app.listen(PORT, () => {
    console.log(`API running http://localhost:${PORT}`);
});