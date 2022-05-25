// Import statement to add all necessary files to this program
import app from './api/app.js';

// Local host will run on below defined port
const port = 5000;

// Below code will create a listener on the specified path
app.listen(port, () => {
    console.log(`Server is running at ${port}.`);
});