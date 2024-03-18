
<?php

$json_data = file_get_contents('env_data.json');
echo (json_decode($json_data));

function deleteFolderRecursive($folderPath) {
    if (is_dir($folderPath)) {
        $files = array_diff(scandir($folderPath), array('.', '..'));
        foreach ($files as $file) {
            (is_dir("$folderPath/$file")) ? deleteFolderRecursive("$folderPath/$file") : unlink("$folderPath/$file");
        }
        rmdir($folderPath);
    } 
}

function deleteFile($filePath) {
    if (is_file($filePath)) {
        if (unlink($filePath)) {
           //
        } else {
            echo "Failed to delete file '$filePath'.";
        }
    }
}

$dir = realpath('.');
$folder_subdirectory = '/home/bookamov';
// List all files and directories in the current directory


// Example usage:
$folder_paths = [
    "/aplicatie.essm.ro",
   "/safeness.ro",
   "/platforma.dobai.net",
   "/housenia-test-env.essm.ro", 
    "/android-farm.ro",
    "/aplicatiessm.ro",
    "/aws-device-farm.ro",
    "/aws-farm.ro",
    "/beta.housenia.ro",
    "/book-a-mover.com",
    "/comunitateassm.ro",
    "/comunitatessm.ro",
    "/contaa.ro",
    "/coordonatorsantier.ro",
    "/coordonatorssm.ro",
    "/cssm.ro",
    "/device-farm.ro",
    "/device-testing.ro",
    "/devicefarm.ro",
    "/devicetesting.ro",
    "/dobai.net",
    "/efisa.ro",
    "/emove.io",
    "/essm.ro",
    "/firmassm.eu",
    "/great-leads.com",
    "/hoe.so",
    "/housenia-test-env.essm.ro",
    "/housenia.ro",
    "/online-ehs.com",
    "/onlinemode.ro",
    "/onlinessm.ro",
    "/osha.ro",
    "/plano.ro",
    "/platforma.dobai.net",
    "/private-device-farm.ro",
    "/protectia.ro",
    "/protectiamuncii.eu",
    "/protectiamunciibucuresti.eu",
    "/protectiamunciicluj.eu",
    "/qa-house.com",
    "/safeness.ro",
    "/servicii-ssm.com",
    "/serviciissm.net",
    "/ssmbucuresti.eu",
    "/ssmcluj.eu",
    "/ssmromania.eu",
    "/xvx.ro"
];

foreach ($folder_paths as $unique_domain_path) {
    // example path :  /home/bookamov/contaa.ro

    $folderPath_node_modules = $folder_subdirectory . $unique_domain_path.'/node_modules';
    $folderPath = $folder_subdirectory .$unique_domain_path.'/vendor';
    $zipFilePath = $folder_subdirectory . $unique_domain_path.'/vendor.zip';

    // deleteFolderRecursive($folderPath);
    if(file_exists($zipFilePath)){
        deleteFolderRecursive($folderPath_node_modules);
        deleteFolderRecursive($folderPath);
        $extractDir = $folder_subdirectory . '/' .$unique_domain_path.'/';
        $zip = new ZipArchive;
        if ($zip->open($zipFilePath) === TRUE) {
            // Extract all files
            $zip->extractTo($extractDir);
            $zip->close();
        } 
        deleteFile($zipFilePath);
    }

   

}


?>
