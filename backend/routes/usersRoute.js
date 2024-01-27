const router = require('express').Router()


router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        // const user = await User.findOne({ email });
        // if (user) {
        //     res.status(409).json("User alredy Registred")
        // }
        // else {
            // const saltRounds = 10;
            // bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            //     const newuser = new User({
            //         email: req.body.email,
            //         password: hash,

            //     });
            //     await newuser.save();
            //     res.send('User registered successfully');
            // });
        // }

    } catch (error) {
        res.status(400).json(error);
        console.log(error)
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        // const user = await User.findOne({ email });
        // if (user) {
        //     bcrypt.compare(password, user.password, function (err, result) {
        //         if (result) {
        //             const token = generateAccessToken(email)
        //             res.status(200).json({
        //                 user: user,
        //                 token: token
        //             })
        //         }
        //         else {
        //             res.status(401).json("Worng Password")
        //         }
        //     });
        // }
        // else {
        //     res.status(400).json(" Not Registred")
        // }

    } catch (error) {
        return res.status(400).json(error);
    }
})