const nodemailer = require("nodemailer")
exports.sendEmail = async (req, res) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",   //server
            port: 465,
            auth: {
                user: "kirtipriya1753@gmail.com",
                pass: "leel slvn grkx ddgn"
            }

        })

        const data = {
            from: "kirtipriya@gmail.com",
            to: req.body.email,
            subject: req.subject,
            text: req.text
        }

        transport.sendMail(data, (error, info) => {        ///(error,info) is a call back function
            if (error) {
                console.log(error);
                res.console(400).json({ message: "Email Delivery Error" })

            } else {
                console.log(info);
                res.console(200).json({ message: "Successr" })
            }
        })
    } catch (error) {
        console.log(error);
        res.console(400).json({ message: "Error" })
    }
}