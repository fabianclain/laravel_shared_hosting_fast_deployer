const { resolve } = require("path");
const { readFile, writeFile } = require("fs");
const ftp = require("basic-ftp");
// eslint-disable-next-line no-unused-vars
const fse = require("fs-extra");
const fs = require("fs");

const today = new Date();
let envFileChoice = "./.env-backup";
let env_details = "./.env-backup";
let envFile = resolve(envFileChoice);
const should_write_env_file = true;
let localFiles = [];
const {remotePath, folders_to_upload, ftp_host_domain, ftp_username_domain, ftp_password_domain, baseline_dev_folder} = require('../envs_data.js');
let ftp_host = ftp_host_domain;
let ftp_username = ftp_username_domain;
let ftp_password = ftp_password_domain;

let remove_directory_before_uploading = false; //attention when this is true
const client_verbose_status = false;

const static_version_number = "APP_VERSION = 1.7.5.7";

 localFiles = folders_to_upload;
console.log(remotePath);

 
function writeVersionFile() {
  readFile(envFile, "utf-8", function (err, contents) {
    if (err) {
      console.log(err);
      return;
    }
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const new_version = `${static_version_number}[${dd}.${mm}.${today.getHours()}]`;
    const replaced = contents.replace(/^APP_VERSION.*$/m, new_version);

    writeFile(envFile, replaced, "utf-8", function (err) {
      if (err != null) {
        console.log("error for .env file", err);
      } else {
        console.log(".env uploaded");
      }
    });
  });
}
async function writeENVFile(client, remotePath) {
  try {
    await client.remove(`${remotePath}/.env`);
    // await client.remove(remotePath + '/vendor.zip')
  } catch (err) {
    console.log("catch");
    console.log("GOT AN ERROR", err);
  }
  try {
    console.log(`env: ${remotePath} file ->${envFile}`);
    await client.appendFrom(envFile, `${remotePath}/.env`, { overwrite: true });
    console.log("Success!");
  } catch (err) {
    console.log("catch");
    console.log("GOT AN ERROR", err);
  }
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}



run_deployment();



async function run_deployment() {
  const client = new ftp.Client();
  const local_file = resolve("./");
  client.ftp.verbose = client_verbose_status;
  try {
    await client.access({
      host: ftp_host,
      user: ftp_username,
      password: ftp_password,
      secure: false,
    });
    await console.log("started upload");
    file_zip = local_file + '/vendor.zip';

    for (remote in remotePath) {

      
      for (path in localFiles) {
       await console.log(`${remotePath[remote]}/${localFiles[path]}`);
        if(remove_directory_before_uploading){
          await client.removeDir(`${remotePath[remote]}/${localFiles[path]}`);
        }
       await client.ensureDir(`${remotePath[remote]}/${localFiles[path]}`);
        await client.uploadFromDir(`${local_file}//${localFiles[path]}`);
      }
      await console.log("upload finished, writing env.");
      if (should_write_env_file) {
        if (remotePath[remote][0] === "/housenia.ro")
          envFileChoice = baseline_dev_folder + ".env_housenia";
        else if (remotePath[remote] === "/essm.ro")
          envFileChoice = baseline_dev_folder + ".env_essm";
        else if (remotePath[remote] === "/aplicatie.essm.ro") {
          envFileChoice = baseline_dev_folder + ".env_aplicatieEssm";
          console.log("YOU DEPLOYED TO PRODUCTION!!!!");
        } else if (remotePath[remote] === "/beta.housenia.ro")
          envFileChoice = baseline_dev_folder + ".env_beta_housenia";
        else if (remotePath[remote] === "/app.device-testing.ro")
          envFileChoice = baseline_dev_folder + ".env_device_testing";
        else if (remotePath[remote] === "/testing.housenia.ro")
          envFileChoice = baseline_dev_folder + ".env_testing_housenia";
        else if (remotePath[remote] === "/housenia-test-env.essm.ro")
          envFileChoice = baseline_dev_folder + ".env-housenia_test_essm";
        else if (remotePath[remote] === "/safeness.ro")
          envFileChoice = baseline_dev_folder + ".env_safeness";
        else if (remotePath[remote] === "/moverbook.com")
          envFileChoice = baseline_dev_folder + ".env_moverbook";
        else if (remotePath[remote] === "/demo.essm.ro")
          envFileChoice = baseline_dev_folder + ".env_demo_essm";
        else if (remotePath[remote] === "/platforma.dobai.net")
          envFileChoice = baseline_dev_folder + ".env_dobai";
        else envFileChoice = baseline_dev_folder + ".env-backup";

        envFile = resolve(envFileChoice);
        writeVersionFile();
        await sleep(2000);
        await writeENVFile(client, remotePath[remote]);
      }
      if (fs.existsSync(file_zip)) {
        // File exists, proceed with uploading
        await client.uploadFrom(file_zip, `${remotePath[remote]}/vendor.zip`);
        console.log(`Uploaded zip folder.`);
      } else {
        // File does not exist, handle the case
        console.log(`No zip to upload.`);
      }
      await console.log(`Finished folder: ${remotePath[remote]}`);
    }

    if (fs.existsSync(file_zip)) {
      await fs.unlinkSync(file_zip)
    } 

    await console.log("All done!");
  } catch (err) {
    console.log("GOT AN ERROR", err);
  }
  client.close();
}
