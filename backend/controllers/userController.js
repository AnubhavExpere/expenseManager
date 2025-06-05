import { insertUser, fetchUserByEmail, fetchUserDetails, fetchMonthlyIncomeByYear, fetchMonthlyExpenseByYear, fetchIncomeByMonthYear, fetchExpenseByMonthYear } from "../models/userModel.js"
import hashPassword from "../utils/bcrypt.js";
import bcrypt from 'bcrypt'
import { generateAccessToken } from "../utils/jwtUtil.js";

const getUserDetails = async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await fetchUserDetails(userId);
        res.json(result);
    } catch (err) {
        console.log('Error getting user details.');
    }
}

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
        res.status(201).json({ message: 'OK' });
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

        const result = await fetchUserByEmail(obj);

        if(result.length === 0)
            return res.status(400).json({message: 'Invalid Email'});

        const user=result[0];
        const isValid = await bcrypt.compare(obj.password, user.password)

        if(!isValid)
            return res.status(401).json({message: 'Incorrect Password.'});

        const accessToken = generateAccessToken({userId : user.id});
        
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, // set to true in production (HTTPS)
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000, // 15 minutes
        });

        res.status(200).json({
            message: 'Logged in successfully.'
        });
    } catch (err) {
        console.error('Login failed. ', err);
        return res.status(500).json({ message: 'Login failed' });
    }
}

const logoutUser = (req, res) => {
    res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .status(200)
        .json({message: 'Logged out successfully.'});
}

const getMonthlyIncomeByYear = async (req, res) => {
    const userId = req.user.userId;
    const yr = req.query.year;
    
    let data = [
        { income: '', month: 1, year: yr },
        { income: '', month: 2, year: yr },
        { income: '', month: 3, year: yr },
        { income: '', month: 4, year: yr },
        { income: '', month: 5, year: yr },
        { income: '', month: 6, year: yr },
        { income: '', month: 7, year: yr },
        { income: '', month: 8, year: yr },
        { income: '', month: 9, year: yr },
        { income: '', month: 10, year: yr },
        { income: '', month: 11, year: yr },
        { income: '', month: 12, year: yr },
    ];


    try {
        const result = await fetchMonthlyIncomeByYear(userId, yr);
        
        //completing the data for all 12 months in 'data' variable
        data = data.map( obj => {
            const found = result.find(row => row.month === obj.month);
            return found ? {...found, year: yr} : obj;
        })
        res.json(data);
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
}

const getMonthlyExpenseByYear = async (req, res) => {
    const userId = req.user.userId;
    const yr = req.query.year;

    let data = [
        { expense: '', month: 1, year: yr },
        { expense: '', month: 2, year: yr },
        { expense: '', month: 3, year: yr },
        { expense: '', month: 4, year: yr },
        { expense: '', month: 5, year: yr },
        { expense: '', month: 6, year: yr },
        { expense: '', month: 7, year: yr },
        { expense: '', month: 8, year: yr },
        { expense: '', month: 9, year: yr },
        { expense: '', month: 10, year: yr },
        { expense: '', month: 11, year: yr },
        { expense: '', month: 12, year: yr },
    ];

    try {
        const result = await fetchMonthlyExpenseByYear(userId, yr);

        //completing the data for all 12 months in 'data' variable
        data = data.map(obj => {
            const found = result.find( row => parseInt(row.month) === obj.month);
            return found ? {...found, year: yr} : obj;
        });
        res.json(data);
    } catch {
        console.log('Error getting monthly expenses.');
    }
}

const getIncomeByMonthYear = async (req, res) => {
    const userId = req.user.userId;
    const month = req.query.month;
    const year = req.query.year;

    try {
        const result = await fetchIncomeByMonthYear(userId, month, year);
        result.length>0 ? res.json(result[0]) : res.json({income: 0, month: month, year: year});
    } catch (err) {
        res.status(500).json({message: 'Server error.'});
    }
}

const getExpenseByMonthYear = async (req, res) => {
    const userId = req.user.userId;
    const month = req.query.month;
    const year = req.query.year;

    try {
        const result = await fetchExpenseByMonthYear(userId, month, year);
        result.length > 0 ? res.status(200).json(result[0]) : res.json({expense: 0, month: month, year: year});
    } catch (err) {
        res.status(500).json({message: 'Server error.'});
    }
}

export {getUserDetails, loginUser, logoutUser, registerUser, getMonthlyIncomeByYear, getMonthlyExpenseByYear, getIncomeByMonthYear, getExpenseByMonthYear};