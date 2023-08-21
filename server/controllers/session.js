const {connection}=require('../databaseconfig/config')
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Utility function to generate a random string
function RandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

module.exports={
    Get:(session)=>{
        return new Promise((resolve,reject)=>{
      connection.query('SELECT * FROM sessions WHERE session=?',[session],
      (err,results)=>{
        // console.log(results,'sesssionss')
          err ? reject(err):resolve(results)
      } )
     
        })
    },
    post:(user_id,session)=>{
        return new Promise((resolve,reject)=>{
            connection.query('INSERT INTO sessions (user_id,session,date)Values (?,?,?)',
            [user_id,session,Date.now()+1000*3600*24*7],
            (err,results)=>{
                return err?reject(err):resolve(results)
            }
            )
        })
    },
    delete:(session)=>{
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM sessions WHERE session=?',[session],
            (err,results)=>{
                err ?reject(err):resolve(results)
            })
        })
    },
    requestPasswordReset: (req, res) => {
        const { email } = req.body;
        const transporter = nodemailer.createTransport({
            service: "gmail", //replace with your email provider
            port: 587,
            host: 'www.electrozayn.com', //change it too www.electrozayn.com
            secure: false,
            auth: {
              user: "aymenaymoun86@gmail.com",
              pass: "qwmjhmeyidvopngu"
            },
            tls: {
              rejectUnauthorized: false,
            }
        });
        
        const url = 'https://www.electrozayn.com' //change it to www.electrozayn.com
        const resetToken = RandomString(64); // Generate a random token
        const resetLink = `${url}/password/reset/${resetToken}`;  //change to wwww.electrozayn.com
    
        // Update the user's reset_token in the database
        const updateTokenQuery = `UPDATE user SET resetToken = "${resetToken}" WHERE Email = "${email}"`;
        connection.query(updateTokenQuery, (err, result) => {
          if (err) {
            res.status(500).send(err);
          } else {
            // Send password reset email
    
            const mailOptions = {
              from: 'electroz@gmail.com',
              to: email,
              subject: 'Electrozayn - réinitialiser votre mot de passe',
              html: `Bonjour, <br/>
              Nous avons bien réçu votre demande de modification mot de passe. <br/>
              Pour continuez veuillez cliquer <a href="${resetLink}">içi</a> <br/>
              <br/>
              <a href="www.electrozayn.com">ELECTROZAYN</a>
              `,
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.status(500).send(error);
              } else {
                res.status(200).send('Votre demande a bien été envoyée.');
              }
            });
          }
        });
      },
      resetPassword: (req, res) => {
        const { token } = req.params; // Get the token from URL parameter
        const { newPassword, confirmPassword } = req.body; // Parse data from request body
        console.log(req.body);
    
        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return res.status(400).send("Les mots de passe ne correspondent pas..");
        }
    
        // Hash the new password using crypto
        const newPasswordHashed = crypto.createHash('sha256').update(newPassword).digest('hex');
    
        // Update the user's password using the resetToken
        const updatePasswordQuery = `UPDATE user SET Password = "${newPasswordHashed}", resetToken = NULL WHERE resetToken = "${token}"`;
        connection.query(updatePasswordQuery, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send('Le mot de passe a été mis à jour avec succès.');
            }
        });
    },
}