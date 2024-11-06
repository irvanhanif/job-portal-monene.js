export const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Data Engineer",
  "Data Science",
  "Graphic Designer",
  "UI Developer",
  "Wordpress Developer",
  "Software Engineer",
];

export const filterData = [
  {
    filterType: "Location",
    array: ["Surabaya", "Jakarta", "Malang", "Bandung"],
  },
  {
    filterType: "Job Type",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Web Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-50000", "50000-1000000", "1000000-5000000"],
  },
];

export const inputBodyLogin = [
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter password",
  },
  {
    label: "Select role",
    name: "role",
    placeholder: "Select a user role",
    list: ["student", "recruiter"],
  },
];

export const inputBodyRegister = [
  {
    label: "Full Name",
    type: "text",
    name: "fullname",
    placeholder: "Enter your name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Phone Number",
    type: "text",
    name: "phoneNumber",
    placeholder: "Enter your phone number",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter password",
  },
  {
    label: "Upload Photo",
    type: "file",
    name: "picture",
  },
  {
    label: "Profile Skills",
    type: "text",
    name: "profileSkills",
    placeholder: "Enter the profile skills with commas",
  },
  {
    label: "Upload Resume",
    type: "file",
    name: "resume",
  },
  {
    label: "Select role",
    name: "role",
    placeholder: "Select a user role",
    list: ["student", "recruiter"],
  },
];

export const inputBodyCompany = [
  {
    label: "Company Name",
    type: "text",
    name: "name",
    placeholder: "Enter Company name",
  },
  {
    label: "Description",
    type: "text",
    name: "description",
    placeholder: "Enter description",
  },
  {
    label: "website",
    type: "text",
    name: "website",
    placeholder: "Enter website url",
  },
  {
    label: "Location",
    type: "text",
    name: "location",
    placeholder: "Enter location",
  },
  {
    label: "Upload Logo",
    type: "file",
  },
];

export const inputBodyJob = [
  {
    label: "Title",
    type: "text",
    name: "title",
    placeholder: "Enter the job title",
  },
  {
    label: "Description",
    type: "text",
    name: "description",
    placeholder: "Enter description",
  },
  {
    label: "Requirements",
    type: "text",
    name: "requirements",
    placeholder: "Enter Requirements with commas",
  },
  {
    label: "Salary",
    type: "number",
    name: "salary",
    placeholder: "Enter the salary",
  },
  {
    label: "Location",
    type: "text",
    name: "location",
    placeholder: "Enter location",
  },
  {
    label: "Job Type",
    type: "text",
    name: "jobType",
    placeholder: "Enter the jobType",
  },
  {
    label: "Experience in year (1,2,3,...)",
    type: "text",
    name: "experienceLevel",
    placeholder: "Please enter the experience",
  },
  {
    label: "Positions",
    type: "text",
    name: "position",
    placeholder: "Enter the position",
  },
  {
    label: "Select Company Job",
    type: "select",
    name: "companyId",
    placeholder: "Select a company",
  },
];

export const inputBodyUpdateUser = [
  {
    label: "Full Name",
    type: "text",
    name: "fullname",
    placeholder: "Enter your name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Phone Number",
    type: "text",
    name: "phoneNumber",
    placeholder: "Enter your phone number",
  },
  {
    label: "Profile Skills",
    type: "text",
    name: "profileSkills",
    placeholder: "Enter the profile skills with commas",
  },
  {
    label: "Upload Photo",
    type: "file",
    name: "picture",
  },
  {
    label: "Upload Resume",
    type: "file",
    name: "resume",
  },
];
