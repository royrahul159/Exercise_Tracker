const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req,res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email }); 
      if(user && user.password === req.body.password) {
          res.send(user)
      } else {
          res.status(404).json({error: 'User not exists'})
      }
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
      
});

module.exports = router;