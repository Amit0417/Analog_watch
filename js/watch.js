let hh = document.getElementById("hh"); // hour hand
let mm = document.getElementById("mm"); // minut hand
let ss = document.getElementById("ss"); // second hand
let current_time = document.getElementById("current_time");
let s_btn = document.getElementById("s_btn");
let watch_set_start_end; 
let currentTime;
let watch_set = setInterval(clockRun,1000);

// Function for clock hand
function clockRun() {    
    let time_now = new Date();
    let hr = time_now.getHours();
    let min = time_now.getMinutes();
    let sec = time_now.getSeconds();
    
    let time_hr = (hr*30) + (min/2);
    let time_min = (min*6) + (sec/10);
    let time_sec = sec*6;

    hh.style.transform = `rotate(${time_hr}deg)`;
    mm.style.transform = `rotate(${time_min}deg)`;
    ss.style.transform = `rotate(${time_sec}deg)`;
}
// Function for current time button
current_time.addEventListener("click", () => {
    clearInterval(watch_set);
    clearInterval(watch_set_start_end);
    let setTime = document.getElementById("setTime");
    setTime.style.display = "none";
    currentTime = setInterval(clockRun,1000);
});
// Funtion for set time button 
function set_Time() {
    let setTime = document.getElementById("setTime");
    setTime.style.display = "block";
}
// Error messege function when time not selected
function errorMessege(){
    document.getElementById("error_1").style.display = 'block';
    setTimeout(() => {
      document.getElementById("error_1").style.display = 'none';
    }, 7000);
}
// Alert on timer completion
function errorMessege2(){
    document.getElementById("error_2").style.display = 'block';
    setTimeout(() => {
      document.getElementById("error_2").style.display = 'none';
    }, 7000);
}
// Submit button function
s_btn.addEventListener("click", ()=>{
    clearInterval(watch_set);
    clearInterval(currentTime);
    let start_time = document.getElementById("start_time").value; 
    let end_time = document.getElementById("end_time").value;

    if (!start_time) {
        errorMessege();
    }
    else if (!end_time) {
        errorMessege();
    }
    else{
        var for_start = start_time.split(":"); 
        let hr_s = for_start[0];
        let min_s = for_start[1];
        let sec_s = 0;

        var for_end = end_time.split(":");
        let hr_e = for_end[0];
        let min_e = for_end[1];

        let time_hr_e = (parseInt(hr_e)*30) + (parseInt(min_e)/2);
        let time_min_e = (parseInt(min_e)*6);
        // Function for timer time
        function time_start_end() {
           let time_hr_s = (parseInt(hr_s)*30) + (parseInt(min_s)/2) + ((sec_s /2) / 60);
           let time_min_s = (parseInt(min_s)*6) + (sec_s/10);
           let time_s = sec_s * 6 ;
            // Function for timer hand 
           function startEndRotate() {
            hh.style.transform = `rotate(${time_hr_s}deg)`;
            mm.style.transform = `rotate(${time_min_s}deg)`;
            ss.style.transform = `rotate(${time_s}deg)`;
           }
           let my_sound = document.getElementById("my_sound")
           if (time_hr_e == time_hr_s){
            if (time_min_e == time_min_s) {
                // Alarm sound on timer completion
                my_sound.play();
                setTimeout(() => {
                    my_sound.pause();
                  }, 7000);
                errorMessege2();           
                clearInterval(watch_set_start_end); 
                clearInterval(watch_set);
                document.getElementById("start_time").value = "";
                document.getElementById("end_time").value = "";
                document.getElementById("setTime").style.display = "none";
            }else{
                startEndRotate();
                sec_s +=1;
            }
           }else{
            startEndRotate();
            sec_s +=1;
           }
        }
        watch_set_start_end = setInterval(time_start_end,1000);
    }
});