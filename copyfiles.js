import fs from 'fs-extra';

// Define paths for source files and destination folder
const sourceFolder = './games';
const htmlFile = 'index.html';
const cssFile = 'styles.css';
const destinationFolder = './dist';

// Function to copy files
export const copyFiles = async () => {
    try {
        // Create destination folder if it doesn't exist
        await fs.ensureDir(`${destinationFolder}/games`);
        await fs.ensureDir(`${destinationFolder}/icon`);

        // Copy the folder recursively
        await fs.copy(sourceFolder, `${destinationFolder}/games`);

        // Copy HTML file
        await fs.copy(`${htmlFile}`, `${destinationFolder}/${htmlFile}`);

        await fs.copy(`./icon`, `${destinationFolder}/icon`);

        // Copy CSS file
        await fs.copy(`${cssFile}`, `${destinationFolder}/${cssFile}`);

        console.log('Files copied successfully.');
    } catch (err) {
        console.error('Error copying files:', err);
    }
};

// Call the function
// copyFiles();
