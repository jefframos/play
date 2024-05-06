// generateCss.js

import fs from 'fs';

// Function to generate CSS content
const generateCSS = () => {
    return `
    body {
        font-family: 'Poppins', sans-serif; /* Set font to Poppins */
        font-weight: bold; /* Make the font bold */
        background-color: #262626;
        background-image: url('tile-background.png'); /* Set tiled background image */
        background-repeat: repeat; /* Ensures the background image tiles */
        background-size: 50px 50px; /* Sets the size of each tile to 50px by 50px */
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
    }
    h1 {
        color: white;
        text-shadow: 2px 2px 0 #262626;
        font-size: 32px;
        text-align: center; /* Align the page title to the center */
    }
    button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px;
        padding: 10px;
        font-family: 'Poppins', sans-serif; /* Set font to Poppins */
        font-weight: bold; /* Make the font bold */
        font-size: 16px;
        color: white; /* Set font color to white */
        text-shadow: 2px 2px 0 #262626;
        border: 2px solid #262626;
        border-radius: 5px;
        cursor: pointer;
        width: 250px; /* Set fixed width */
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Adding shadow */
    }
    
    button img {
        max-width: 80px;
        max-height: 80px;
        margin-bottom: 10px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Adding shadow */
    }
    
    button span {
        text-align: center;
        word-wrap: break-word;
        background-color: #262626; /* Add black background */
        color: white; /* Set text color to white */
        padding: 5px; /* Add padding to text */
    }
      
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 10px;
        justify-items: center;
        text-align: center;
    width: 100%;
    align-items: center;
    justify-content: center;
    }
    `;
};

// Function to create CSS file
const createCSSFile = (cssContent) => {
    fs.writeFileSync('styles.css', cssContent);
    console.log('styles.css file created successfully.');
};

// Export the generateCSS function
export const generateCss = () => {
    const cssContent = generateCSS();
    createCSSFile(cssContent);
};
