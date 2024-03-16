This script is useful for deploying Laravel apps, FAST to a shared hosting, without SSH access.


How it works?

Simple. Via uploading to FTP, and using the cpanel's functionality: Cron.


What actually happens and how it works?

You upload a .zip file, and there's a cron job, checking if .zip file exists, and if it does, it deletes the pre-packed vendor folder (or node_modules, or whatever) and unzip the .zip folder.

The unzip/delete action, takes less than 1 second, and you'll have a SUPER small downtime.


Let's get a bit more into what happens in the background.

You run locally the npm mix/ or whatever you need in order to get an artifact of the huge vendor file, and then, create a zip, then upload the zip if exists.

if the zip exists, after the unzip is done, the unzip gets deleted for CRON functionality
