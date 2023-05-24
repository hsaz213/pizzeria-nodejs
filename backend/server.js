// Require statements
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('../routes/routes');

// Create express app
const app = express();
const port = 9001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/views')));
app.use(express.static(path.join(__dirname, '../frontend/public')));



app.use('/backend', express.static(path.join(__dirname)));

// Routes
app.use('/', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/', 'index.html'));
});


app.listen(port, () => console.log(`Server running on http://127.0.0.1:${port}`));
