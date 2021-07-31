import nodemailer from 'nodemailer';
import Club from '../models/club';
require('dotenv').config();


export const sendEventRegisterationMail = async (event, user) => {
  const { name, from, to, venue, clubId } = event;
  const startDate = new Date(from);
  const startDateString = `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}   ${startDate.getHours()}:${startDate.getMinutes()}`;

  const toDate = new Date(to);
  const toDateString = `${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()}   ${toDate.getHours()}:${toDate.getMinutes()} `;

  try {
    const club = await Club.findById(clubId);
    if (club) {
      const { name: clubName } = club;
      const {email} = user;
      const mailOptions = {
        from: 'rushil.s@ahduni.edu.in',
        to: `${email}`,
        subject: 'Do Not Reply',
        html: `<p><span style="color: #00ff00;">Congratulations!!</span></p>
        <p>You have registered for the event: ${name}</p>
        <p>Start Time: ${startDateString}<br />End Time: ${toDateString}<br />Venue: ${venue}<br />Organized By: ${clubName}</p>
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
    user: process.env.USER,
    pass: process.env.PASSWORD,
  };
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