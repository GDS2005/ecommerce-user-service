const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userValidation = require('../user/user.validation');

exports.createUser = async (req, res) => {
    try {
        const { error } = userValidation.createUser.body.validate(req.body);
        if (error) return res.status(400).json({ msg: error.details[0].message });

        const { name, email, password, role } = req.body; // Extract variables from req.body

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getUsers = async (req, res) => {
    try {
        const results = await User.find();
        res.json({results});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getUser = async (req, res) => {
    try {
        const results = await User.findById(req.params.id);
        if (!results) return res.status(404).json({ msg: 'User not found' });
        res.json({results});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { id } = req.params;
    
        const { error } = userValidation.updateUser.body.validate(req.body);
        if (error) return res.status(400).json({ msg: error.details[0].message });

        let user = await User.findById(id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        await User.deleteOne({ _id: req.params.id });
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

