// const express = require("express");
// const app = express();
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// //js format
// app.use(express.json());

// // avoid any cors issues
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Origin", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Origin", "Content-Type");
//   next();
// });

// // get api

// app.get("/test", async (req, res) => {
//   try {
//     res.status(200).json({ message: "Hello World" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // this basically grabsa all the users from the database
// app.get("/users", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     // here we return all the users from the database
//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });



// // this basically grabs a single user from the database
// app.get("users/:id", async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: parseInt(req.params.id),
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


// //create our user 
// app.post("/users", async (req, res) => {
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//       },
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }); 


// //update our user
// app.put("/users/:id", async (req, res) => {
//   try {
//     const user = await prisma.user.update({
//       where: {
//         id: parseInt(req.params.id),
//       },
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// //delete our user
// app.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await prisma.user.delete({
//       where: {
//         id: parseInt(req.params.id),
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });



// // listen to the port /start our server

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

//json
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//test api
app.get('/test', (req, res) => {
  try {
    res.status(200).json({ message: 'API is working' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get user by id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create user
app.post('/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update user
app.put('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));