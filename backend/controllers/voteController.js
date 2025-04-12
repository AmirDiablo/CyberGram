const Vote = require("../models/voteModel")
const UserVote = require("../models/userVotesModel")

const createVote = async (req, res)=> {
    const {creator, options, chat, question, isQuiz, isMultiple, isAnonymous} = req.body
    const vote = await Vote.create({creator, options, chat, question, isQuiz, isMultiple, isAnonymous})
}

const allVotes = async(req, res)=> {
    const {chatId} = req.params
    const vote = await Vote.find({chat: chatId})
    res.status(200).json(vote)
}

const submitVotes = async(req, res)=> {
    const {voter, vote, choice} = req.body
    const check = await UserVote.findOne({voter, vote})
    if(check){
        console.log("this user voted before")
    }else{
        const sumbit = await UserVote.create({voter, vote, choice}) 
    }
}

const result = async(req, res)=> {
    const {id, options} = req.body
    const choices = options.flat()
    let arr = [];
    for(let i=0; i<choices.length; i++){
        const information = await UserVote.find({vote: id, choice: choices[i]})
        arr.push(information.length)
    }

    //plus the value of each arr element to find the sum of them (total number of votes)
    let num = 0;
    for(let j=0; j<choices.length; j++){
        num += arr[j]
    }
    
    let percent = [];
    for(let k=0; k<choices.length; k++){
        const per = parseInt(arr[k] * 100 / num)
        percent.push({percentage: per, option: choices[k]})
    }
    res.json(percent)
}

module.exports = {createVote, allVotes, submitVotes, result}