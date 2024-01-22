const users = require("../Models/users")
const jwt = require("jsonwebtoken")

exports.register = async (req, res, next) => {         //next is middleware used to send email
    const { name, PhoneNo, email, password } = req.body //destructuring
    // const hash_password = bcrypt.hashSync(password,10) without creating virtual function


    const _user = new users(req.body)
    const eUser = await users.findOne({ email })
    if (!eUser) {
        _user.save().then(newuser => {
            req.subject = "User Registration"
            req.text = "You have Successfully Signed Up....."
            next()
            //     return  res.status(201).json({newuser, message:"Account Created"})
        }).catch(error => {
            return res.status(400).json({ error, message: "Error Occurred" })

        })

    } else {
        return res.status(400).json({ message: "Account already exists" })
    }
    // to save

    console.log(req.body)
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const eUser = await users.findOne({ email })

    if (eUser) {
        // if(bcrypt.compareSync(password,hash_password)) to compare without creating virtual function
        if (eUser.authenticate(password)) {


            const token = jwt.sign({
                id: eUser._id
            }, "MYSECRETKEY@", {
                expiresIn: "1y"
            })
            res.status(200).json({ token, message: "Login Succesfull" })

        } else {
            return res.status(401).json({ message: "Email or password is incorrect" })
        }


    } else {
        return res.status(404).json({ message: "user not found" })
    }
}



exports.findUser = async (req, res) => {
    const user = await users.findById(req.id)
    return res.status(200).json({ user })

}