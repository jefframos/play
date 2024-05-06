// generateHtml.js

import fs from 'fs';
import path from 'path';

// Function to format folder names
const formatFolderName = (folder) => {
    // Convert to proper case
    let formattedName = folder.replace(/[-_]+/g, ' ').replace(/(\d+)/g, ' $1').toLowerCase();

    // Convert first letter of each word to uppercase
    formattedName = formattedName.replace(/\b\w/g, char => char.toUpperCase());

    return formattedName;
};
// Function to read the commit hash from the JSON file
const getCommitHash = (folder) => {
    const jsonFilePath = `./games/${folder}/json/commit-hash.json`;
    if (fs.existsSync(jsonFilePath)) {
        try {
            const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));            
            return jsonData.hash || '';
        } catch (error) {
            console.error(`Error parsing JSON file '${jsonFilePath}':`, error);
        }
    }
    return '';
};

const getBuildNumber = (folder) => {
    const jsonFilePath = `./games/${folder}/json/commit-hash.json`;
    if (fs.existsSync(jsonFilePath)) {
        try {
            const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));            
            return jsonData.buildCount || '';
        } catch (error) {
            console.error(`Error parsing JSON file '${jsonFilePath}':`, error);
        }
    }
    return '';
};
// Function to generate HTML content
// const generateHTML = (folderNames, colors) => {
//     const buttons = folderNames.map((folder, index) => {
//         let imgSrc = `./games/${folder}/icon/icon.png`;
//         if (!fs.existsSync(imgSrc)) {
//             imgSrc = `./games/${folder}/favicon-256x256.png`;
//             if (!fs.existsSync(imgSrc)) {
//                 imgSrc = './icon/icon.png'; // Default icon path
//             }
//         }
//         const color = colors[index % colors.length];
//         const buildNumber = getBuildNumber(folder);
//         let hashLabel = '';
//         if (buildNumber) {
//             hashLabel = `<span>Build: ${buildNumber}</span><br>`;
//         }
//         // const hash = getCommitHash(folder);
//         // let hashLabel = '';
//         // if (hash) {
//         //     const truncatedHash = hash.substring(0, 6); // Extract first 6 characters of hash
//         //     hashLabel = `<span>Commit: ${truncatedHash}</span><br>`;
//         // }
//         return `<button style="background-color: ${color}" onclick="window.location.href='./games/${folder}'"><img src="${imgSrc}" alt="${folder}">${hashLabel}<span>${formatFolderName(folder)}</span></button>`;
//         //return `<button style="background-color: ${color}" onclick="window.location.href='./games/${folder}'"><img src="${imgSrc}" alt="${folder}"><span>${formatFolderName(folder)}</span></button>`;
//     }).join('\n');

//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>NG-IG Game Hub</title>
//     <link rel="stylesheet" type="text/css" href="styles.css">
// </head>
// <body>
//     <h1>NG-IG Game Hub</h1>
//     <div class="grid-container">
//         ${buttons}
//     </div>
// </body>
// </html>`;
// };

const generateHTML = (folderNames, colors) => {
    const buttons = folderNames.map((folder, index) => {
        let imgSrc = `./games/${folder}/icon/icon.png`;
        console.log(imgSrc)
        if (!fs.existsSync(imgSrc)) {
            imgSrc = `./games/${folder}/favicon-256x256.png`;
            if (!fs.existsSync(imgSrc)) {
                imgSrc = './icon/icon.png'; // Default icon path
            }
        }
        const color = colors[index % colors.length];
        const hash = getCommitHash(folder);
        const preloadPattern = getPreloadPattern(folder);
        let style = `style="background-color: ${color};`;
        if (preloadPattern) {
            style += `background-image: url('${preloadPattern}'); background-size: 50%;";`;
        }else{
            style +='";'
        }
        const buildNumber = getBuildNumber(folder);
        let hashLabel = '';
        if (buildNumber) {
            hashLabel = `<span>Build: ${buildNumber}</span><br>`;
        }
        return `<button ${style} onclick="window.location.href='./games/${folder}/index.html'"><img src="${imgSrc}" alt="${folder}">${hashLabel}<span>${formatFolderName(folder)}</span></button>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playground</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h1>Playground</h1>
    <div class="grid-container">
        ${buttons}
    </div>
</body>
</html>`;
};

// Function to get preload pattern image
const getPreloadPattern = (folder) => {
    const preloadPatternPath = `./games/${folder}/preload/pattern.png`;
    if (fs.existsSync(preloadPatternPath)) {
        return preloadPatternPath;
    }
    return '';
};
// Function to create HTML file
const createHTMLFile = (htmlContent) => {
    fs.writeFileSync('index.html', htmlContent);
    console.log('index.html file created successfully.');
};

// Function to read folder contents
export const generateHtml = () => {
    const gamesFolderPath = './games';
   // const rainbowColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];

   const rainbowColors = [
    'hsl(0, 60%, 60%)',   // Red
    'hsl(30, 60%, 60%)',  // Orange
    // 'hsl(60, 60%, 60%)',  // Yellow
    'hsl(120, 60%, 60%)', // Green
    'hsl(240, 60%, 60%)', // Blue
    'hsl(270, 60%, 60%)', // Indigo
    'hsl(300, 60%, 60%)'  // Violet
];

    fs.readdir(gamesFolderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        const folders = files.filter(file => fs.statSync(path.join(gamesFolderPath, file)).isDirectory());
        const htmlContent = generateHTML(folders, rainbowColors);
        createHTMLFile(htmlContent);
    });
};
