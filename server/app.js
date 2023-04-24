const express = require("express");
const cors = require("cors");
const auth = require("./auth");
const path = require("path");
const complaintSection = require("./complaintSection");
const multer = require("multer");
const upload = multer();
const applicantdB = require("./applicant-db");
const admindB = require("./admin-db");
var bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

app.post("/auth/signin/otp", auth.signin_otp);

app.post("/auth/signin/verify", auth.signin_verify);

app.post("/auth/forgotpassword/otp", auth.forgot_password_otp);
 
app.post("/auth/forgotpassword/verify", auth.forgot_password_verify);

app.post("/auth/signup/otp", auth.signup_otp);

app.post("/auth/signup/verify", auth.signup_verify);

app.post("/contact-us", auth.contact_us);

app.post("/complaintSection/savedata",complaintSection.save_data);

app.post("/complaints/solve/:id",complaintSection.solveIt);


app.post(
  "/save-personal-info",
  upload.fields([
    { name: "profile_image", maxCount: 1 },
  ]),
  applicantdB.save_personal_info
);

app.post(
  "/save-communication-details",
  upload.fields([]),
  applicantdB.save_communication_details
);

app.get("/get-profile-info", applicantdB.get_profile_info);

app.get("/get-user-info", applicantdB.get_user_info);

app.get("/get-user-email", applicantdB.get_user_email);

app.post("/add-admin", upload.fields([]), admindB.add_admin);

app.post("/add-fees-record", upload.fields([]), admindB.add_fees_record);

app.post("/edit-admin", upload.fields([]), admindB.edit_admin);

app.post("/delete-admin", upload.fields([]), admindB.delete_admin);

app.post("/edit-admin-profile", upload.fields([]), admindB.edit_admin_profile);

app.get("/get-admins", admindB.get_admins);

app.get("/get-admin-profile", admindB.get_admin_profile);

app.get("/get-admin-fees-record", admindB.get_fees_record);



app.get ("/admin/getcomplaints",complaintSection.get_all_complaints);

app.get("/admin/solvedcomplaints", complaintSection.get_all_solved_complaints);

app.get("/complaints/:id",complaintSection.get_complaints)


if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
