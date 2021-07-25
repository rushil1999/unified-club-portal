import nodemailer from 'nodemailer';
require('dotenv').config();


export const sendEventRegisterationMail = async event => {
  const { name, from, to, venue, clubId } = event;
  try {
    const club = await Club.findById(clubId);
    if (club) {
      const { name: clubName } = club;
      const mailOptions = {
        from: 'rushil.s@ahduni.edu.in',
        to: 'shahrushil1999@gmail.com',
        subject: 'Do Not Reply',
        html: `<p><span style="color: #00ff00;">Congratulations!!</span></p>
        <p>You have registered for the event:&nbsp;</p>
        <p>Start Time: ${from}<br />End Time: ${to}<br />Venue: ${venue}<br />Organized By: {clubName}</p>
        <p><br />Kindly preserve this mail for future purposes.</p>
        <p>Regards: UCP Team</p>`
      };
      sendEmail(mailOptions);

    }
    else {
      console.log('Could Not find Club');
      return false;
    }
  }
  catch(err){
    console.log('Catch', err.message);
    return false;
  }

}


export const sendEmail = mailOptions => {
  const auth = {
    user: 'rushil.s@ahduni.edu.in',
    pass: process.env.PASSWORD,
  };
  console.log(auth);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth
  });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}