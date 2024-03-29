const User = require("../../models/userModel/usersSchema");
const bcrypt = require("bcrypt");
const generateStrongPassword = require("../../utils/passwordGenerator");
const { sendMail } = require("../../utils/mailer");
const StudentCollege = require("../../models/userModel/student/studentTypeModel/StudentCollegeSchema");
const StudentSchool = require("../../models/userModel/student/studentTypeModel/StudentSchoolSchema");
const StudentJrCollege = require("../../models/userModel/student/studentTypeModel/StudentJrCollegeSchema");

const addSchoolStudent = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      phone,
      parentPhone,
      email,
      gender,
      bloodGroup,
      studentClass,
    } = req.body;

    // Check if the student already exists
    const existingStudent = await StudentSchool.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student already exists with the email" });
    }

    //Create autogenerated password for student

    const autoGeneratedPassword = generateStrongPassword();
    const hashedPassword = await bcrypt.hash(autoGeneratedPassword, 10);

    // Create a new student user
    const newSchoolStudent = new User({
      firstName,
      middleName,
      lastName,
      phone,
      parentPhone,
      password: hashedPassword,
      email,
      gender,
      castCategory,
      educationalDetails: { class: studentClass },
      bloodGroup,
    });

    // Save the new student user to the database
    await newSchoolStudent.save();

    //Send Password credentials via mail to student
    await sendMail(
      email,
      "Subject",
      `Your password is ${autoGeneratedPassword}`
    );

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addCollegeStudent = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      phone,
      parentPhone,
      email,
      bloodGroup,
      gender,
      course,
      branch,
      studentClass,
      castCategory,
    } = req.body;

    //check if student already exists
    const existingStudent = await StudentCollege.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student already exists with the email" });
    }

    //Create autogenerated password for student

    const autoGeneratedPassword = generateStrongPassword();
    const hashedPassword = await bcrypt.hash(autoGeneratedPassword, 10);

    const newCollgeStudent = new StudentCollege({
      firstName,
      middleName,
      lastName,
      phone,
      parentPhone,
      email,
      password: hashedPassword,
      bloodGroup,
      gender,
      educationalDetails: { course, branch, class: studentClass },
      castCategory,
    });

    // Save the new student user to the database
    await newCollgeStudent.save();

    //Send Password credentials via mail to student
    await sendMail(
      email,
      "Subject",
      `Your password is ${autoGeneratedPassword}`
    );

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while adding student from server side" });
  }
};

const addJrCollegeStudent = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      phone,
      parentPhone,
      email,
      bloodGroup,
      gender,
      course,
      branch,
      studentClass,
      castCategory,
    } = req.body;

    //check if student already exists
    const existingStudent = await StudentJrCollege.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student already exists with the email" });
    }

    //Create autogenerated password for student

    const autoGeneratedPassword = generateStrongPassword();
    const hashedPassword = await bcrypt.hash(autoGeneratedPassword, 10);

    const newJrCollgeStudent = new StudentCollege({
      firstName,
      middleName,
      lastName,
      phone,
      parentPhone,
      email,
      password: hashedPassword,
      bloodGroup,
      gender,
      educationalDetails: { course, branch, class: studentClass },
      castCategory,
    });

    // Save the new student user to the database
    await newJrCollgeStudent.save();

    //Send Password credentials via mail to student
    await sendMail(
      email,
      "Subject",
      `Your password is ${autoGeneratedPassword}`
    );

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while adding student from server side" });
  }
};

module.exports = {
  addSchoolStudent,
  addCollegeStudent,
  addJrCollegeStudent,
};
