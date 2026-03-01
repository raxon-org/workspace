<?php

use Raxon\App;

test('admin workandtravel world', function () {
    $app = App::instance();
    $compile = "Admin Workandtravel World";
    expect($compile)->toContain("Admin");
});
