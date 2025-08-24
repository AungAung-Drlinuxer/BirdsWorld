import * as birdService from '../services/BirdService.js';
import logger from '../logger.js';

export const getAllBirds = async (req, res) => {
  try {
    logger.info('Fetching all birds');
    const birds = await birdService.getAllBirds();
    logger.info(`Successfully fetched ${birds.length} birds`);
    res.json({ data: birds, status: "success" });
  } catch (err) {
    logger.error('Error fetching birds', { error: err.message, stack: err.stack });
    res.status(500).json({ error: err.message });
  }
};

export const createBird = async (req, res) => {
  try {
    logger.info('Creating new bird', { birdData: req.body });
    const bird = await birdService.createBird(req.body);
    logger.info('Successfully created bird', { birdId: bird._id });
    res.json({ data: bird, status: "success" });
  } catch (err) {
    logger.error('Error creating bird', { error: err.message, stack: err.stack });
    res.status(500).json({ error: err.message });
  }
};

export const getBirdById = async (req, res) => {
  try {
    logger.info('Fetching bird by ID', { birdId: req.params.id });
    const bird = await birdService.getBirdById(req.params.id);
    if (!bird) {
      logger.warn('Bird not found', { birdId: req.params.id });
      return res.status(404).json({ error: 'Bird not found' });
    }
    logger.info('Successfully fetched bird', { birdId: bird._id });
    res.json({ data: bird, status: "success" });
  } catch (err) {
    logger.error('Error fetching bird by ID', { error: err.message, stack: err.stack, birdId: req.params.id });
    res.status(500).json({ error: err.message });
  }
};

export const updateBird = async (req, res) => {
  try {
    logger.info('Updating bird', { birdId: req.params.id, updateData: req.body });
    const bird = await birdService.updateBird(req.params.id, req.body);
    if (!bird) {
      logger.warn('Bird not found for update', { birdId: req.params.id });
      return res.status(404).json({ error: 'Bird not found' });
    }
    logger.info('Successfully updated bird', { birdId: bird._id });
    res.json({ data: bird, status: "success" });
  } catch (err) {
    logger.error('Error updating bird', { error: err.message, stack: err.stack, birdId: req.params.id });
    res.status(500).json({ error: err.message });
  }
};

export const deleteBird = async (req, res) => {
  try {
    logger.info('Deleting bird', { birdId: req.params.id });
    const bird = await birdService.deleteBird(req.params.id);
    if (!bird) {
      logger.warn('Bird not found for deletion', { birdId: req.params.id });
      return res.status(404).json({ error: 'Bird not found' });
    }
    logger.info('Successfully deleted bird', { birdId: bird._id });
    res.json({ data: bird, status: "success" });
  } catch (err) {
    logger.error('Error deleting bird', { error: err.message, stack: err.stack, birdId: req.params.id });
    res.status(500).json({ error: err.message });
  }
};