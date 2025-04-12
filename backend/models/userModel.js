const mongoose = require("mongoose")
const Schema = mongoose.Schema
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    username: {
        required: true,
        unique : true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    bio: {
        type: String
    },
    date: {
        type: String
    },
    profile: {
        type: String,
        default: "profile.png"
    },
    wallpaper: {
        type: String,
        default: "background.jfif"
    },
    contacts: [{
        type: mongoose.Types.ObjectId, ref: "User"
    }],
    status: {
        type: String
    }
}, {timestamps: true})

userSchema.statics.signup = async function (username, email, password){
    if(!username || !email || !password){
        throw Error("all fields must be field")
    }

    const validate = await this.findOne({username})
    if(validate){
        throw Error("this username is allready taken")
    }

    if(!validator.isAlphanumeric(username)){
        throw Error("username field must fill with alpha numeric character")
    }

    if(!validator.isEmail(email)){
        throw Error("this is not a real email address")
    }

    const emailExist = await this.findOne({email})
    if(emailExist){
        throw Error("this email address is allready taken by another user")
    }

    const sault = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, sault)

    const user = await this.create({username, email, password: hash})

    return user
}

userSchema.statics.login = async function (username, email, password) {
    if(!username || !email || !password){
        throw Error("all fields must be field")
    }

    const user = await this.findOne({username})
    if(!user){
        throw Error("username not found")
    }

    const emailExist = await this.findOne({username, email})
    if(!emailExist){
        throw Error("username and email does not match")
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("password is incorrect!")
    }

    return user
}

userSchema.statics.profileInfo = async function (myId, username, bio, date) {
    const findUser = await this.find({_id: myId})
    console.log("username is: ",findUser[0].username)

    if(!username){
        username = findUser[0].username
    }

    if(!validator.isLength(bio, {max: 60})){
        throw Error("you reached max length of 60 bio charactors")
    }
   /*  if(!validator.isDate(date)){
        throw Error("wrong date!")
    } */

    const user = this.updateOne({_id: myId}, {$set: {username: username, bio: bio, date: date}})

    return user

}

const User = mongoose.model("User", userSchema)

module.exports = User