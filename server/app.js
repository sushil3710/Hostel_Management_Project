const express = require("express");
const cors = require("cors");
const auth = require("./auth");
const path = require("path");
const complaintSection = require("./complaintSection");
const multer = require("multer");
const upload = multer();
const studentDB = require("./student-db");
const admindB = require("./admin-db");
const ListDownloader = require("./ListDownloader");
const FeeScript = require("./feescript");
var bodyParser = require("body-parser");
const roomExchanger = require("./roomExchanger");

const app = express();

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


app.post("/auth/signin/verify", auth.signin_verify);

app.post("/auth/forgotpassword/otp", auth.forgot_password_otp);   // testing in progress

app.post("/auth/forgotpassword/verify", auth.forgot_password_verify);

app.post("/contact-us", auth.contact_us);

app.post("/complaintSection/savedata", complaintSection.save_data);  // testing done

app.post("/complaints/solve/:id", complaintSection.solveIt);   // testing done


app.post(
  "/save-personal-info",
  upload.fields([
    { name: "profile_image", maxCount: 1 },
  ]),
  studentDB.save_personal_info
);

app.post(
  "/save-communication-details",
  upload.fields([]),
  studentDB.save_communication_details
);
app.post(
  "/save-fees-details",
  upload.fields([
    {
      name: "fees_pdf", maxCount: 1
    }
  ]),
  studentDB.save_fees_details
);
// app.get("/getAllInfo/:id", studentDB.getAllInfo);

app.get("/get-profile-info", studentDB.get_profile_info); //done

app.get("/get-user-info", studentDB.get_user_info); // done

app.get("/get-fees-info", studentDB.get_fees_info); // done

app.get("/get-fees-history", studentDB.get_fees_history); //done

app.post("/add-admin", upload.fields([]), admindB.add_admin);

app.post("/add-fees-record", upload.fields([]), admindB.add_fees_record);

app.post("/edit-admin", upload.fields([]), admindB.edit_admin);

app.post("/delete-admin", upload.fields([]), admindB.delete_admin);

app.post("/delete-student", upload.fields([]), admindB.delete_student);

app.post("/edit-admin-profile", upload.fields([]), admindB.edit_admin_profile);

app.post("/view-excel", upload.fields([]), admindB.view_excel);
app.get(
  "/get-list-in-excel",
  ListDownloader.get_list_in_excel
);
app.post(
  "/get-fee-in-excel", upload.fields([]),
  FeeScript.get_fee_in_excel
);
app.get("/get-admins", admindB.get_admins);

app.get("/get-students", admindB.get_students);

app.get("/get-admin-profile", admindB.get_admin_profile);

app.get("/get-admin-fees-record", admindB.get_fees_record);

app.post("/add-excel", upload.fields([{ name: "excelfile", maxCount: 1 }]), admindB.add_excel);

app.post("/add-students", upload.fields([]), admindB.add_students);

app.post("/add-student", upload.fields([]), admindB.add_student);

app.post("/delete-excel", upload.fields([]), admindB.delete_excel);

app.get("/get-excel", admindB.get_excel);
 
app.get("/admin/getcomplaints", complaintSection.get_all_complaints);  //done testing

app.get("/admin/solvedcomplaints", complaintSection.get_all_solved_complaints); // done testing 

app.get("/complaints/:id", complaintSection.get_complaints); // done testing 

app.get("/getmycomplaints/:id", complaintSection.get_my_complaints); // done testing 

app.get("/myRoomRequest/:id", roomExchanger.get_my_requests);   // done testing 

app.get("/getAllRequest", roomExchanger.get_all_requests);  // done testing 

// app.post("/checkRoomAvailability", roomExchanger.checkForRoom)  // 

app.post("/updateStatus/:id", roomExchanger.statusUpdater); // done testing 

app.post("/post-Room-Request", roomExchanger.request_for_exchange);  // done testing 

module.exports = app;