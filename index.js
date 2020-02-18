 const fs = require("fs");
 const axios = require("axios");
 const inquirer = require("inquirer");
 const api = require("./api");
 const path = require("path");

 const generateHTML = require("./generateHTML")
 const open = require("open");
 const conversionForm = require("electron-html-to");
 let axiosResponse;



// inquirer.prompt([
//         {
//         type: 'input',
//         message: "What is your GitHub username?",
//         name: "username"
//         },
//         {
//         type: 'rawlist',
//         message: "What color do you want?",
//         choices:[" green", " blue"," pink", " red", ],
//         name: "colors"
//         }, 
//     ])
//     .then(function ({ username, colors }) {
//         const queryUrl = 'https://api.github.com/users/${username}?client_id=undefined&client_secret=undefined';
//          axios
//             .get(queryUrl)
//             .then(({ data }) => {
//                 axiosResponse = JSON.stringify(data);
//                 fs.writeFileSync(`${colors}.txt`, axiosResponse, (err) => {

//                     if (err) throw err;
//                     console.log(`Wrote ${colors}.text`);
//                   })
            
//             .catch(function(err){
//                 console.error(err);
//              })
        
//      });
const questions = [
    {
    type: "input",
    message: "What is your GitHub username?",
    name: "username"
    },
    {
    type: "rawlist",
    message: "What color do you want?",
    choices:[" green", " blue"," pink", " red", ],
    name: "colors"
    },
];
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);

}
     function init(){
         inquirer.prompt(questions).then(({ github, color }) => {
             console.log("Searching..");
         
     api    
        .getUser(github).then(response =>
            api.getTotalStars(github)
            .then(stars => {
                return generateHTML({
                    stars,
                    color,
                    ...response.data
                });
            })
        )
        .then(html => {
            const conversion = conversionForm({
                converterPath: conversionForm.converters.PDF
            });

            conversion({ html }, function(err, result) {
                if (err) {
                    return console.log(err);
                }
                result.stream.pipe(
                    fs.createWriteStream(path.join(__dirname, "resume.pdf"))

                );
                conversion.kill();
            });

            open(path.join(process.cwd(), "resume.pdf"));

        });
    });
}
init();
    
