// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const Survey = require('./models/survey');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));

// mongoose.connect('mongodb://localhost/valsurvey', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//     console.log("Connected to DB");
// }).catch((error) => {
//     console.error("Error connecting to DB:", error);
// });

// app.get('/', (req, res) => {
//     res.render('index');
//     // res.send('index')
// });

// app.get('/Players', async (req, res) => {
//     //res.render('Players');
//     const Players = await Survey.find({});
//     res.send(Players)
// });

// app.get('/thanks', (req, res) => {
//     //res.send('thanks, your form has been submitted');
//     res.render('thanks')
// });

// app.post('/formRead', async (req, res) => {
//     await Survey.create({
//                             name: req.body.name, 
//                             email: req.body.email, 
//                             age: req.body.age,
//                             role: req.body.role,
//                             rank: req.body.rank
//     })
//     console.log(req.body)
//     res.redirect('/thanks')
// })

    
//     // Other routes and application setup here

//     // Start your Express server
// app.listen(3000, () => {
//  console.log('Server is running on port 3000');
// });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Survey = require('./models/survey');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/valsurvey', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to DB");
}).catch((error) => {
  console.error("Error connecting to DB:", error);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/Players', async (req, res) => {
  try {
    const players = await Survey.find({});
    res.render('players', { players });
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/thanks', (req, res) => {
  res.render('thanks');
});

app.post('/formRead', async (req, res) => {
  try {
    await Survey.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      role: req.body.role,
      rank: req.body.rank
    });
    console.log(req.body);
    res.redirect('/thanks');
  } catch (error) {
    console.error("Error creating a new entry:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
