window.$ = window.jQuery = require('jquery');
var fs = require('fs');
var sudo = require('sudo-prompt');
require('bootstrap');


var cpu = "";
var c;

var governor;

$(document).ready(function () {

    $(".btn-danger").click(function () {
        read();
    })

    $(".btn-success").click(function () {
        save();
    })

    $("#gv1").click(function () {
        $(".btn-success").text($("#gv1").text())

    })

    $("#gv2").click(function () {
        $(".btn-success").text($("#gv2").text())

    })

    function read() {
        fs.readFile('/sys/devices/system/cpu/present', 'utf-8',
            function (err, data) {
                if (err) throw err;
                cpu = parseFloat(Number(data.slice(2, 3)) + 1)
                for (c = 0; c < cpu; c++) {
                    let fileUrl = "/sys/devices/system/cpu/cpu" + c + "/cpufreq/scaling_governor"
                    let slc = "#cpu" + c + ""
                    fs.readFile(fileUrl, 'utf-8',
                        function (err, data) {
                            if (err) throw err;
                            $(slc).val(data)
                        })
                }
            })
    }

    function save() {
        governor = $(".btn-success").text();
        fs.readFile('/sys/devices/system/cpu/present', 'utf-8',
            function (err, data) {
                if (err) throw err;
                //cpu = parseFloat(Number(data.slice(2, 3)) + 1)
                //let fileUrl = "echo " + governor + " >/sys/devices/system/cpu/cpu" + c + "/cpufreq/scaling_governor &&";
                let fileUrl = "echo " + governor + " >/sys/devices/system/cpu/cpu0/cpufreq/scaling_governor && echo " + governor + " >/sys/devices/system/cpu/cpu1/cpufreq/scaling_governor && echo " + governor + " >/sys/devices/system/cpu/cpu2/cpufreq/scaling_governor && echo " + governor + " >/sys/devices/system/cpu/cpu3/cpufreq/scaling_governor";
                console.log(fileUrl)
                sudo.exec(fileUrl,
                    function (error, stdout, stderr) {
                        if (error) throw error;
                        read();
                    })
            })
    }
})

