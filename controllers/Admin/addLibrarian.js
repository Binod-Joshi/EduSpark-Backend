const { sendMail } = require("../../utils/mailer");

const addLibrarian = async (req, res) => {
    try {
        const { firstName,
            middleName,
            lastName,
            phone,
            email,
            gender,
            bloodGroup } = req.body

        // Check if the Librarian already exists
        const existingLibrarian = await User.findOne({ email });
        if (existingLibrarian) {
            return res
                .status(400)
                .json({ message: "Librarian already exists with the email" });
        }

        //Create autogenerated password for teacher

        const autoGeneratedPassword = generateStrongPassword()
        const hashedPassword = await bcrypt.hash(autoGeneratedPassword, 10);

        // Create a new Librarian user
        const newLibrarian = new User({
            role: 'Teacher',
            firstName,
            middleName,
            lastName,
            phone,
            password: hashedPassword,
            email,
            gender,
            bloodGroup
        });

        // Save the new Librarian to the database
        await newLibrarian.save();

        //Send password credential via mail to librarian
        await sendMail(email, 'Subject', `Your password is ${autoGeneratedPassword}`)

        res.status(201).json({ message: "Librarian added successfully" });
    } catch (error) {
        console.error("Error adding teacher:", error);
        res.status(500).json({ message: "Internal server error" }); p
    }

}

module.exports = addLibrarian