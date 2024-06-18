import moment from 'moment';
import fs from 'fs';

const logMiddleware = (req, res, next) => {
    const fileName = `logs/log_${moment().format("D_M_Y")}.txt`;
    let content = '';
    content += `Date: ${moment().format("DD/MM/YYYY")}\n`;
    content += `Time: ${moment().format("HH:mm:ss")}\n`;
    content += `Route: ${req.url}\n`;
    content += `Method: ${req.method}\n`;

    res.locals.errorMessage = '';

    res.on('finish', () => {
        if (res.statusCode >= 400) {
            content += `Status Code: ${res.statusCode}\n`;
            content += `Error: ${res.statusMessage}\n`; // and add it here after the coma 
            content += `Error Message: ${res.locals.errorMessage}.\n\n`
            fs.appendFile(fileName, content, err => {
                if (err) {
                    console.error('Error writing to log file:', err);
                }
            });
        }
    });
    next();
};

export default logMiddleware;
