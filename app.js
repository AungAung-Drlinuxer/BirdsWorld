import 'newrelic'; // Must be first
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import birdRouter from './routes/BirdRoutes.js';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';

import logger from './logger.js';

const swagger = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/birds", birdRouter);

// Swagger UI
app.use(
  '/swagger',
  swaggerUI.serve,
  swaggerUI.setup(swagger, { explorer: true })
);

// MongoDB connection (cleaned)
mongoose.connect('mongodb://root:secret@localhost:27017/swagger?authSource=admin')
  .then(() => {
    logger.info('✅ Connected to MongoDB (swagger database)');
    console.log('✅ Connected to MongoDB (swagger database)');
  })
  .catch(err => {
    logger.error('❌ MongoDB connection error:', { error: err.message, stack: err.stack });
    console.error('❌ MongoDB connection error:', err);
  });

// Add a simple test route to verify logging
app.get('/test-logging', (req, res) => {
  logger.info('Test log message sent to New Relic', { 
    timestamp: new Date().toISOString(),
    route: '/test-logging',
    userAgent: req.get('User-Agent')
  });
  
  // Also send directly to New Relic
  logger.sendToNewRelic('info', 'Direct test log to New Relic', {
    route: '/test-logging'
  });
  
  res.json({ 
    message: 'Test log sent', 
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(3001, () => {
  logger.info('🚀 Server is running on http://localhost:3001/swagger/');
  console.log(`🚀 Server is running on http://localhost:3001/swagger/`);
});

export default app;
