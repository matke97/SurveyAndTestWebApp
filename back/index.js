const express = require('express');
const cors = require('cors');

const app = express();
/**
 * Express settings
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const http = require("http").Server(app);

const PORT = process.env.PORT || 8000;
/******
 * Server starting
 *****/
app.listen(PORT, () => console.log(`Server startet on port ${PORT}`));

/******
 * Routing of requests
******/
app.use('/user', require('./Routes/user.routes'));
app.use('/anketa', require('./Routes/anketa.routes'));