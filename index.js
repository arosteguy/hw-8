const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const Prince = require("prince");
const util   = require("util")

 const generateHTML = require("./generateHTML")
let axiosResponse;

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
         axios
            .get(queryUrl)
            .then(({ data }) => {
                axiosResponse = JSON.stringify(data);
                fs.writeFileSync(`${colors}.txt`, axiosResponse, (err) => {

                    if (err) throw err;
                    console.log(`Wrote ${colors}.text`);
                  })
                Prince()
                    .inputs(`${colors}.txt`)
                    .output("test.pdf")
                    .execute()
                    .then(function (generateHTML) {
                        console.log("OK: done")
                    })
                    .catch( function (error) {
                        console.log("ERROR: ", util.inspect(error))
                    })
            })
            .catch(function(err){
                console.error(err);
             })
        
     })
    
     .catch(function(err){
        console.log(err);
     })
   

    
  