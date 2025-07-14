 const express = require('express'); // express
 const app = express(); // app
//  const port = 3000; // port
 require('dotenv').config(); // dotenv
 require('./db');  // 👈 Yeh zaroor hona chahiye

 const bodyParser = require('body-parser'); // body-parser
 const cors = require('cors'); // cors
 app.use(bodyParser.json()); // body-parser
 app.use(cors()); // cors
const PORT=process.env.PORT || 5000;

const userRoutes=require('./routes/userRoute');
app.use('/user',userRoutes);

const candidateRoutes=require('./routes/candidate');
app.use('/candidate',candidateRoutes);

 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });