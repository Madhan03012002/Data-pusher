import Account from '../models/accountModel.js';

export const createAccount = async (req, res) => {
  try {
    const { email, account_name, website } = req.body;
    const account = await Account.create({ email, account_name, website });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAccount = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      if (!id) {
        return res.status(400).json({ error: 'Account ID is required' });
      }
  
      const [updated] = await Account.update(req.body, {
        where: { account_id:id }
      });
  console.log(updated,"-----------")
      if (!updated) {
        return res.status(404).json({ error: 'Account not found' });
      }
  
      const updatedAccount = await Account.findByPk(id);
      return res.json(updatedAccount);
      
    } catch (error) {
      console.error('Update error:', error);
      return res.status(500).json({ 
        error: 'Failed to update account',
        details: error.message 
      });
    }
  };

export const deleteAccount = async (req, res) => {
  try {
    const deleted = await Account.destroy({
      where: { account_id: req.params.id }
    });
    if (deleted) {
      return res.json({ message: 'Account deleted' });
    }
    throw new Error('Account not found');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};