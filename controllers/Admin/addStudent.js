const User = require("../../models/userModel/usersSchema");
const bcrypt = require('bcrypt');
const generateStrongPassword = require("../../utils/passwordGenerator");
const { sendMail } = require("../../utils/mailer");

const addStudent = async (req, res) => {
    try {
        const { firstName,
            middleName,
            lastName,
            phone,
            parentPhone,
            email,
            gender,
            bloodGroup,
            studentClass,
            studentBranch,
            castCategory, } = req.body

        // Check if the student already exists
        const existingStudent = await User.findOne({ email });
        if (existingStudent) {
            return res
                .status(400)
                .json({ message: "Student already exists with the email" });
        }

        //Create autogenerated password for student

        const autoGeneratedPassword = generateStrongPassword()
        const hashedPassword = await bcrypt.hash(autoGeneratedPassword, 10);

        // Create a new student user
        const newStudentUser = new User({
            role: 'Student',
            firstName,
            middleName,
            lastName,
            phone,
            parentPhone,
            password: hashedPassword,
            email,
            gender,
            castCategory,
            educationalDetails: { branch: studentBranch, class: studentClass },
            bloodGroup
        });

        // Save the new student user to the database
        await newStudentUser.save();

        //Send Password credentials via mail to student
        await sendMail(email, 'Subject', `Your password is ${autoGeneratedPassword}`)

        res.status(201).json({ message: "Student added successfully" });

    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = addStudent