import express from 'express';
import process from 'process';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './backend/config/db.js';
import errorHandler from './backend/middleware/errorHandler.js';
import userRoutes from './backend/routes/userRoutes.js';
import transactionRoutes from './backend/routes/TransactionRoutes.js'
import categoryRoutes from './backend/routes/CategoryRoutes.js'
import typeRoutes from './backend/routes/TypeRoutes.js'
import cors from 'cors';


dotenv.config();
connectDB().then(() => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  app.set('port', PORT);
  
  
  const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));
  app.use(bodyParser.json());

  
  app.get('/', (req,res)=>{
    res.status(200).json({
      message: 'Helloooo'
    })
  })
  app.use('/api/users', userRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/transactions', transactionRoutes);
  app.use('/api/types', typeRoutes)

  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
  });
});


