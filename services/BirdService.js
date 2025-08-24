import BirdModel from '../models/Bird.js';
import newrelicPkg from 'newrelic';
import logger from '../logger.js';

const newrelic = newrelicPkg.default || newrelicPkg; // handle ESM interop

export const getAllBirds = async () => {
  return await newrelic.startSegment('BirdService.getAllBirds', true, async () => {
    logger.info('Executing getAllBirds database query');
    try {
      const birds = await BirdModel.find();
      logger.info(`Found ${birds.length} birds in database`);
      return birds;
    } catch (error) {
      logger.error('Error in getAllBirds', { error: error.message, stack: error.stack });
      throw error;
    }
  });
};

export const createBird = async (bird) => {
  return await newrelic.startSegment('BirdService.createBird', true, async () => {
    logger.info('Executing createBird database operation', { birdData: bird });
    try {
      const newBird = await BirdModel.create(bird);
      logger.info('Successfully created bird', { birdId: newBird._id });
      return newBird;
    } catch (error) {
      logger.error('Error in createBird', { error: error.message, stack: error.stack });
      throw error;
    }
  });
};

export const getBirdById = async (id) => {
  return await newrelic.startSegment('BirdService.getBirdById', true, async () => {
    logger.info('Executing getBirdById database query', { birdId: id });
    try {
      const bird = await BirdModel.findById(id);
      if (bird) {
        logger.info('Found bird by ID', { birdId: bird._id });
      } else {
        logger.warn('Bird not found by ID', { birdId: id });
      }
      return bird;
    } catch (error) {
      logger.error('Error in getBirdById', { error: error.message, stack: error.stack, birdId: id });
      throw error;
    }
  });
};

export const updateBird = async (id, bird) => {
  return await newrelic.startSegment('BirdService.updateBird', true, async () => {
    logger.info('Executing updateBird database operation', { birdId: id, updateData: bird });
    try {
      const updatedBird = await BirdModel.findByIdAndUpdate(id, bird, { new: true });
      if (updatedBird) {
        logger.info('Successfully updated bird', { birdId: updatedBird._id });
      } else {
        logger.warn('Bird not found for update', { birdId: id });
      }
      return updatedBird;
    } catch (error) {
      logger.error('Error in updateBird', { error: error.message, stack: error.stack, birdId: id });
      throw error;
    }
  });
};

export const deleteBird = async (id) => {
  return await newrelic.startSegment('BirdService.deleteBird', true, async () => {
    logger.info('Executing deleteBird database operation', { birdId: id });
    try {
      const deletedBird = await BirdModel.findByIdAndDelete(id);
      if (deletedBird) {
        logger.info('Successfully deleted bird', { birdId: deletedBird._id });
      } else {
        logger.warn('Bird not found for deletion', { birdId: id });
      }
      return deletedBird;
    } catch (error) {
      logger.error('Error in deleteBird', { error: error.message, stack: error.stack, birdId: id });
      throw error;
    }
  });
};