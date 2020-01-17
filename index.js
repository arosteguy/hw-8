const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const Prince = require("prince");

inquirer
    .prompt([
    {
    type: 'input',
    message: "What is your GitHub username?",
    name: "username"
    },

    {
    type: 'rawlist',
    message: "What color do you want?",
    choices:[" green", " blue"," pink", " red", ],
    name: "colors"
    },
    
])
    .then(function ({ username, colors }) {
        const queryUrl = `https://api.github.com/users/${username}?client_id=undefined&client_secret=undefined`;
        axios.get(queryUrl).then(({ data }) => {
            console.log(data);
        });
        console.log(colors)
    })
    .catch(function(err){
        console.log(err);
    })
    
    fs.writeToFile(`${colors}.txt`, data, (err) => {

        if (err) throw err;
        console.log(`Wrote ${colors}.text`);
     })