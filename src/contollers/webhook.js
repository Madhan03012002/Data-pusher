import Account from '../models/accountModel.js';
import { forwardData } from '../service/service.js';

export const handleIncomingData = async (req, res) => {
  try {
     const secretToken = req.headers['cl-x-token'];
    if (!secretToken) {
      return res.status(401).json({ error: 'Un Authenticate' });
    }

     if (!req.is('application/json') || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Invalid Data' });
    }

     const account = await Account.findOne({ 
      where: { app_secret_token: secretToken } 
    });
    
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

     await forwardData(account.account_id, req.body);

    res.status(200).json({ 
      success: true, 
      message: 'Data forwarded successfully',
      account_id: account.account_id
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
};