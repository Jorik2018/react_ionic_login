<?php
        // create curl resource
        $ch = curl_init();

        // set url
        curl_setopt($ch, CURLOPT_URL, "http://web.regionancash.gob.pe/admin/desarrollo-social/api/covid/vaccine-covid/0/10?query=".$_GET['query']);

        //return the transfer as a string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        // $output contains the output string
        $output = curl_exec($ch);

        // close curl resource to free up system resources
        curl_close($ch);    
        die($output);
?>