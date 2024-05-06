// generateAll.js

import { generateHtml } from './generateHtml.js';
import { generateCss } from './generateCss.js';
import { copyFiles } from './copyfiles.js';

// Call both generators
generateHtml();
generateCss();
copyFiles();
