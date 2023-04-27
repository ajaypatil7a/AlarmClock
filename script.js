
// Getting HTML elements
const select = document.querySelectorAll("select");
const time = document.querySelector("h1");
const button = document.querySelector("button");
const list  = document.getElementById("list");
let timeArray = [];

// Adding Hours, minutes and ap/pm to the list
for(let i = 12;i>0;i--){
    i = i<10 ? "0" + i : i ;
    let option = `<option value="${i}">${i}</option>`;
    // Inserting hours to the option list
    select[0].firstElementChild.insertAdjacentHTML("beforebegin",option) 
}

for(let i = 59;i>=0;i--){
    i = i<10 ? "0" + i : i ;
    let option = `<option value="${i}">${i}</option>`;
    // Inserting minutes to the option list
    select[1].firstElementChild.insertAdjacentHTML("beforebegin",option)
}

for(let i = 2;i>0;i--){
    let am_pm = i==1 ? "AM" : "PM" ;
    let option = `<option value="${am_pm}">${am_pm}</option>`;
    // Inserting am/pm to the option list
    select[2].firstElementChild.insertAdjacentHTML("beforebegin",option)
}

// for continue updation of time we set up time interval which will update time every second
setInterval(()=>{
    let date  = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let ampm = "AM";
    // if hours become 12 then its pm changing time ampm to am from pm
    if(hour >= 12){
        hour = hour - 12;
        ampm = "PM";
    }
    // if hours become 12 previeously we subtracted 12 from it so it become 0 also it show time 0 at mindnight
    // changing it from 0 to 12
    hour = hour == 0 ? hour = 12 : hour ;

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    time.innerText=`${hour}:${minute}:${second} ${ampm}`

    let currentTime = `${hour}:${minute} ${ampm}`
    // time array have contain list of alarm times so if they become same alarm start to ring
    for(let i = 0;i<timeArray.length;i++ ){
        if(currentTime==timeArray[i].alarm){
            // play audio function will play the alarm
            playAudio();
        }
    }

},1000);

// Getting ringtone from html document
let ring = document.getElementById("ringtone");
function playAudio() {
  ring.play();
}

// addAlarm function will add alarm to list
function addAlarm(alarmTime){
    const li = document.createElement('li');
    li.innerHTML = `<li><h4 id="${alarmTime.id}">${alarmTime.alarm}</h4> <img src="./Images/delete.png" class="delete" id="${alarmTime.id}"/>`
    list.append(li)
}
// renderlist renders list of the alarms
function renderList(){
    list.innerHTML='';
    for(let i = 0;i<timeArray.length;i++){
        addAlarm(timeArray[i]);
    }
}

// set alarm function will set get selected time nd append it in timeArray
function setAlarm(){
    let alarm = `${select[0].value}:${select[1].value} ${select[2].value}`;
    if(alarm.includes('hours') || alarm.includes('minute') || alarm.includes('am/pm')){
        return alert("Please, select time to set alarm...!")
    }
    // creating object with alarm timing string and id
    let data = {
        alarm,
        id : Date.now().toString()
    }
    timeArray.push(data);
    renderList();
}

// deleteAlarm function delete the alarm from timeArray
function deleteAlarm(timeID){
    let newTimeArray = timeArray.filter(function(time){
        return time.id !== timeID;
    });
    timeArray=newTimeArray;
    renderList();
    alert("Alarm Deletd Successfully")
}

// will check is delete item is get pressed if yes then it invoked deleteAlarm function
function handleClick(e){
    const target = e.target;

    if(target.className === "delete"){
        const timeID = target.id;
        deleteAlarm(timeID);
    }
}

button.addEventListener('click',setAlarm);
document.addEventListener('click',handleClick);