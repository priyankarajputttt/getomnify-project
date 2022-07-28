const userSchema = require('../model/user.model');
const jwt = require('jsonwebtoken');

const registration = async (req, res) => {
    const data = req.body;
    try {
        const dataRes = await userSchema.create(data);
        return res.status(201).send({
            status: true,
            message: 'Account created successfully !',
            data: dataRes
        });
    }
    catch (error) {
        if (error.code == 11000) {
            return res.status(400).send({
                status: false,
                message: 'Duplicate Email Id'
            });
        }
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const emailRes = await userSchema.findOne({
            email: email
        });
        if (!emailRes) {
            return res.status(404).send({
                status: false,
                message: 'Invalid username and password'
            });
        }

        if (password != emailRes.password) {
            return res.status(404).send({
                status: false,
                message: 'Invalid username and password'
            });
        }

        const token = jwt.sign({
            'au': email,
            'fullname': emailRes.firstname + " " + emailRes.lastname,
            'abbr': emailRes.firstname[0]
        }, '1234');

        return res.status(200).send({
            status: true,
            message: 'Login Success',
            data: token
        });

    } catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
}
module.exports = {
    registration,
    login
}