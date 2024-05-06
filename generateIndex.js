import fs from 'fs';
import path from 'path';
import generateCss from 'generateCss.js';

// Function to format folder names
const formatFolderName = (folder) => {
    // Convert to proper case
    let formattedName = folder.replace(/[-_]+/g, ' ').replace(/(\d+)/g, ' $1').toLowerCase();

    // Convert first letter of each word to uppercase
    formattedName = formattedName.replace(/\b\w/g, char => char.toUpperCase());

    return formattedName;
};

// Function to generate HTML content for index.html with image buttons
const generateHTML = (folderNames, colors) => {
    const buttons = folderNames.map((folder, index) => {
        let imgSrc = `./games/${folder}/icon/icon.png`;
        if (!fs.existsSync(imgSrc)) {
            imgSrc = `./games/${folder}/favicon-256x256.png`;
            if (!fs.existsSync(imgSrc)) {
                imgSrc = './icon/icon.png'; // Default icon path
            }
        }
        const color = colors[index % colors.length];
        return `<button style="background-color: ${color}" onclick="window.location.href='./games/${folder}'"><img src="${imgSrc}" alt="${folder}"><span>${formatFolderName(folder)}</span></button>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h1>Index</h1>
    ${buttons}
</body>
</html>`;
};

// Function to generate CSS content for styles.css
// const generateCSS = () => {
//     return `button {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     margin: 10px;
//     padding: 10px;
//     font-size: 16px;
//     border: 2px solid #007bff;
//     border-radius: 5px;
//     cursor: pointer;
//     width: 200px; /* Set fixed width */
// }

// button img {
//     max-width: 80px;
//     max-height: 80px;
//     margin-bottom: 10px;
// }

// button span {
//     text-align: center;
//     word-wrap: break-word;
// }`;

// };

// Function to create index.html file
const createHTMLFile = (htmlContent) => {
    fs.writeFileSync('index.html', htmlContent);
    console.log('index.html file created successfully.');
};

// Function to create styles.css file
const createCSSFile = (cssContent) => {
    fs.writeFileSync('styles.css', cssContent);
    console.log('styles.css file created successfully.');
};

// Function to read folder contents
const readFolderContents = () => {
    const gamesFolderPath = './games';
    const rainbowColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];

    fs.readdir(gamesFolderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        const folders = files.filter(file => fs.statSync(path.join(gamesFolderPath, file)).isDirectory());
        const htmlContent = generateHTML(folders, rainbowColors);
        const cssContent = generateCSS();
        createHTMLFile(htmlContent);
        createCSSFile(cssContent);
    });
};

readFolderContents();
