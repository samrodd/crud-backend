//import database setup utils
const createDB = require('./database/utils/createDB');
const seedDB = require('./database/utils/seedDB');

// Instantiate express application
const express = require("express");
const app = express();

//our database instance
const db = require('./database');

//express router
const apiRouter = require('./routes/index');


//setting up DB
const syncDatabase = async () => {
  //sync and seed
  try {
    await db.sync({force: false});
   // console.log('------Synced to db--------')
   // await seedDB();
   // console.log('--------Successfully seeded db--------');
  } catch (err) {
    console.error('syncDB error:', err);
  }  
}

//setting up API
const configureApp = async () => {
  // handle request data
  //lets us take in json data as a part of request bodies
  app.use(express.json());
  //allows us to parse the json take from line above 
  app.use(express.urlencoded({ extended: false }));

  // Mount apiRouter
  //lets us use routes defined in apiRouter
  app.use("/api", apiRouter);

  // Handle page not found:
  // gets triggered when a request is made to
  // an undefined route 
  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!");
    error.status = 404;
    next(error);
  });

  // Error-handling middleware: 
  // all express errors get passed to this
  // when next(error) is called
  app.use((err, req, res, next) => {
    console.error(err);
    console.log(req.originalUrl);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });

};

const bootApp = async () => {
  await createDB();
  await syncDatabase();
  await configureApp();
};

bootApp();


const PORT = 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));