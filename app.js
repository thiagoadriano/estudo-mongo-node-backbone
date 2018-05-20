var express = require('express'),
    app = express();

app.configure(() => {
    app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/public'));
});

app.get('/', (req, res) => {
    res.render('index', {layout: false});
});

app.listen(8080);