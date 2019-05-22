const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
// const auth = require('./routes/auth');
const mongoose = require('mongoose');
const User = require('./models/user');


const app = express();

app.use(bodyParser.json());   // middleware
app.use(cors());              // middleware
// app.use('/auth', auth);

mongoose.connect('mongodb://localhost:27017/face-recognition-db', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
}).then(() => {
  console.log(`Connected to database`);
}).catch((error) => {
  console.error('A connection error has occured', error);
});

// app.use(session({
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60 // 1 day
//   }),
//   secret: 'some-string',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000
//   }
// }));

// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'John',
//       email: 'john@gmail.com',
//       password: 'cookies',
//       entries: 0,
//       joined: new Date()
//     },
//     {
//       id: '124',
//       name: 'Sally',
//       email: 'sally@gmail.com',
//       password: 'bananas',
//       entries: 0,
//       joined: new Date()
//     }
//   ],
//   login: [
//     {
//       id: '987',
//       hash: '',
//       email: 'john@gmail.com'
//     }
//   ]
// }


app.get('/', (req, res) => {

  User.findOne()
  .then(user => {
    return res.send(user.users);
  })
  .catch(error => {
    next(error);
  })
})

app.post('/signin', (req, res) => {
  bcrypt.compare("apples", '$2a$10$GPpzTZSRzOhZMEtRqMdGze/IvznM3I.tpn/GW.jnW5lAXkIwLZ3Lq', (err, res) => {
    console.log('first guess', res);
  });
  bcrypt.compare("veggies", '$2a$10$GPpzTZSRzOhZMEtRqMdGze/IvznM3I.tpn/GW.jnW5lAXkIwLZ3Lq', (err, res) => {
    console.log('second guess', res);
  });

  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
        // res.json('success');
        res.json(database.users[0])
      } else {
        res.status(400).json('error logging in');
      }
  res.json('signin');
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  // bcrypt.hash(password, null, null, function(err, hash) {
  //   console.log(hash);
  // });

  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach(user => {
    if( user.id === id) {
      found = true;
      return res.json(user);
    }
  })

  if (!found) {
    res.status(400).json('not found');
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach(user => {
    if( user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(400).json('not found');
  }
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

app.listen(5000, () => {
  console.log('app is running on port 5000');
})
