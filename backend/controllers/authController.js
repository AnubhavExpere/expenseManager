

const registerUser = async (req, res) => {
    const hashedPassword = await hashPassword(req.body.password, 10);
    const profilePhotoUrl = req.file ? req.file.path : ''

    try {
        const user = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            password: hashedPassword,
            profile_photo_url: (profilePhotoUrl ? profilePhotoUrl : '')
        }
        await insertUser(user);  
        res.status(200).json({ message: 'OK' });
    } catch (err) {
        console.log('Failed to insert user', err);
        res.status(500).json({message: 'User registration failed.'});
    }
}

const loginUser = async (req, res) => {
    try {
        const obj = {
            email : req.body.email,
            password: req.body.password
        }

        const result = await authenticateUser(obj);

        if(result.length === 0)
            return res.status(400).json({message: 'Invalid Email'});

        const user=result[0];
        const isValid = await bcrypt.compare(obj.password, user.password)

        if(!isValid)
            return res.status(400).json({message: 'Incorrect Password.'});

        const accessToken = generateToken({userId : user.id});
        
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, // set to true in production (HTTPS)
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        
        res.status(200).json({
            message: 'Logged in successfully.'
        });
    } catch (err) {
        console.error('Login failed. ', err);
        return res.status(500).json({ message: 'Login failed' });
    }
}