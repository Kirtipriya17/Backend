const Forms = require("../Models/Forms")


exports.addForm = async (req, res,next) => {

    try {
        const { name, pNo, email, message, interest } = req.body
        const _form = new Forms(req.body)
        await _form.save()
        req.subject = "User Form"
            req.text = "Form Successfully Saved....."
            next()
        res.status(201).json({ message: "Form has been submitted" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error" })

    }
}