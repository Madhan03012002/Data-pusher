import Destination from '../models/destinationModel.js';
import axios from 'axios';

export const forwardData = async (accountId, data) => {
  try {
    const destinations = await Destination.findAll({ 
      where: { account_id: accountId } 
    });

    await Promise.all(destinations.map(async (destination) => {
      const config = {
        method: destination.http_method,
        url: destination.url,
        headers: {
          ...destination.headers,
          'Content-Type': 'application/json'
        }
      };

      if (destination.http_method.toUpperCase() === 'GET') {
        config.params = data; // Send as query params for GET
      } else {
        config.data = data; // Send as body for POST/PUT/etc.
      }

      try {
        await axios(config);
      } catch (error) {
        console.error(`Failed to forward to ${destination.url}:`, error.message);
        // Continue with other destinations even if one fails
      }
    }));
  } catch (error) {
    console.error('Forwarding error:', error);
    throw error;
  }
};