import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

/*
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user-entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Generate QR code and save it as an image file
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_image.png'));

    // Save the URL to a text file
    fs.writeFile('URL.txt', url, (err) => {
      if (err) {
        console.error("Error writing to URL.txt:", err);
      } else {
        console.log("The file has been saved");
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong:", error);
    }
  });
