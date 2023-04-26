import React, { useState, useEffect } from "react";
function GuideLines() {

  const guidelinesStyle = {
    fontSize: "25px",
  };
  const headingStyle = {
    fontSize: "40px",
    textAlign: "center",
    fontFamily: "Times New Roman"
  };

  return (
    <div className="flex justify-center items-center bg-white min-h-screen">
    <div style={{margin: "auto" }} className="p-5">
      <br />
      <h1 style={headingStyle}>Website Guidelines</h1>
      <br />
      <div className="p-5">
        <ol>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>   1.  Students must enter their information correctly, otherwise strict action will be taken by authorities.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>   2.  Students coming from leave or going for a leave should register in Inout management with proper details</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>   3.  If users find any discrepancy in website, they can send their grievances through Contact Us</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>   4.  Students can share their various hostel related complaints related to plumbing, electrical fittings, wifi etc on the website to assigned authorities through various forms</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>   5.  Maintenance of hostel property is a collective responsibility of the residents. Financial responsibility falls on residents for any damages or loss of furnishings in their assigned rooms. Deliberate destruction may result in fines, expulsion from the hostel, or referral to the Institute Disciplinary Committee. Regular inspections will take place, and penalties may be imposed for any uncleanliness found in the rooms.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>   6.  BTech/MSc students are required to vacate their hostel rooms on the first day of summer/winter vacation. Belongings should be transferred to the designated room, and the keys returned to the hostel office while marking the departure date and time. Failure to do so may result in penalties. Students may be permitted to stay for genuine reasons, subject to approval.</li>
          <br />
        </ol>
        <br />
        <h1 style={headingStyle}>Hostel Guidelines</h1>
        <br />
        <ol>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>1.  Hostel residents must maintain a peaceful environment at all times, especially between 10.00 PM and 6.00 AM to avoid disturbing the IIT community. Complaints about noise levels will be investigated and punished if found to be valid.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>2.  Residents must use designated trashcans and avoid littering, while any birthday parties must be held outside the hostel with Warden/Asst. warden approval, leaving the area clean afterward. Religious activities are limited to individual rooms with roommates and relevant authorities' consent, and common areas cannot be used for such events.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>3.  Hostellers are not permitted to bring / keep pets inside the hostel premises</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>4.  The visit of boy students to the Girls’ hostel and vice versa is restricted.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>5.  Typically, rooms are assigned to students for an academic year, and requests for room changes are not entertained. However, under exceptional circumstances and for the benefit of all residents, a student may be reassigned to a different room.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>6.  Residents cannot move furniture from its designated location, and painting or writing on the walls, doors, and windows is prohibited. While decoration with curtains is encouraged, the room must be restored to its original condition upon moving out.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>7.  In each semester, the dues to the hostel (including fines) should be cleared
            before handing over the keys of the hostel room.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>8.  Ragging is a cognizable offense and is strictly prohibited in all forms. Any student found guilty will face legal action and may be expelled from the institute. It is the responsibility of all hostellers to be familiar with the Institute's Anti-ragging rules and promote a zero-tolerance approach to ragging.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>9.  Residents must seek permission from the Warden or concerned authorities before organizing any function or meeting within or outside the hostel campus. Activities that are considered antisocial, anti-national, or undesirable are strictly prohibited and will result in severe penalties. Maintaining a safe and conducive living environment is the responsibility of all residents.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>10.  The use of tobacco, alcohol, and drugs is strictly prohibited within the hostel premises. Any resident found to be in violation of this policy will face severe disciplinary action, including possible expulsion from the hostel. Possession of drugs or alcohol will also result in referral to local law enforcement authorities.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>11.  Interfering with the network devices or electronic equipment in the hostel premises and disrupting the campus internet is strictly prohibited. Any such actions will be dealt with severely and will invite disciplinary action. We urge all members of the community to comply with the established guidelines to maintain the integrity of the network systems and electronic devices in the hostel premises.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>12.  The use of powered vehicles within the campus is prohibited, and any vehicle brought to the hostel will be confiscated. Exceptions may be made for students with disabilities. Bicycles should be used by residents and parked in designated areas to ensure the safety of pedestrians and smooth flow of traffic.</li>
          <br />
          <li style={{ fontSize: '25px', fontFamily: "Times New Roman", paddingLeft: '20px' }}>13.  Breach of hostel rules will result in an enquiry by management, with disciplinary action taken against the guilty resident. The management reserves the right to take appropriate disciplinary action, including expulsion from the hostel. Hostel authorities can conduct room inspections without prior notice. The rules are subject to change, and students will be informed via email.</li>
        </ol>
        <br />
      </div>
    </div>
    </div>

  );
}

export default GuideLines;

