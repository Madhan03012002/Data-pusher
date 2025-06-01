import Destination from '../models/destinationModel.js';
import Account from '../models/accountModel.js';

export const createDestination = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.account_id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const destination = await Destination.create({
      ...req.body,
      account_id: account.account_id
    });

    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAccountDestinations = async (req, res) => {
    try {
      const { account_id } = req.params;
  
      const destinations = await Destination.findAll({
        where: { account_id }
      });
  
      res.json(destinations);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      res.status(500).json({ error: 'Failed to fetch destinations' });
    }
  };
  

  export const getDestination = async (req, res) => {
    try {
      const destination = await Destination.findByPk(req.params.id);  
      if (!destination) {
        return res.status(404).json({ error: 'Destination not found' });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
export const updateDestination = async (req, res) => {
  try {
    const [updated] = await Destination.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedDestination = await Destination.findByPk(req.params.id);
      return res.json(updatedDestination);
    }
    throw new Error('Destination not found');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const deleted = await Destination.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.json({ message: 'Destination deleted' });
    }
    throw new Error('Destination not found');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};