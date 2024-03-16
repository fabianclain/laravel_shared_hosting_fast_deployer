This script is useful for deploying Laravel apps, FAST to a shared hosting, without SSH access.

I created this, for being able to deploy the source files, SUPER fast, witout leaving vs Code.

I have 2 use cases, that are VERY important for me:

1. Have the posibility to deploy specific files, without uploading the bundle.
2. upload the bundle zipped, and run a cron job for checking if zip exists. if zip exists, delete the existing folder, unzip, then delete the zip.

How it works?

Simple. Via uploading to FTP, and using the cpanel's functionality: Cron + PHP's unzip.

Meaning you will be able to upload, and unzip VERY fast. 


What actually happens and how it works?

You upload a .zip file, and there's a cron job, checking if .zip file exists, and if it does, it deletes the pre-packed vendor folder (or node_modules, or whatever) and unzip the .zip folder.

The unzip/delete action, takes less than 1 second, and you'll have a SUPER small downtime.


Let's get a bit more into what happens in the background.

You run locally the npm mix/ or whatever you need in order to get an artifact of the huge vendor file, and then, create a zip, then upload the zip if exists.

if the zip exists, after the unzip is done, the unzip gets deleted for CRON functionality



Feel free to create a issue, if you need something addressed or if something is not working properly for you.
