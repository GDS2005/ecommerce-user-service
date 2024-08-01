const UserSchema = require('../user/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authValidation = require('../auth/auth.validation');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
      const userExists = await UserSchema.findOne({ email });

      if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new UserSchema({
          name,
          email,
          password: hashedPassword,
          role: role || 'user' 
      });

      await user.save();

      const payload = { user: { id: user._id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
          if (err) throw err;
          res.status(201).json({ token });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error } = authValidation.login.body.validate(req.body);
        if (error) return res.status(400).json({ msg: error.details[0].message });

        let user = await UserSchema.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ 
                tokens: {access: token},
                role: user.role,
                id: user._id,
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};