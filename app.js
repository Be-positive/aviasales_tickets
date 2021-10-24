// ------Main part, Tickets-------
const price = document.querySelectorAll('.price')
const timeArrival = document.querySelectorAll('.timeArrival')
const timeDeparture = document.querySelectorAll('.timeDeparture')
const arrivalStops = document.querySelectorAll('.arrivalStops')
const departureStops = document.querySelectorAll('.departureStops')
const transfersQuantA = document.querySelectorAll('.transfersQuantA')
const transfersQuantD = document.querySelectorAll('.transfersQuantD')
const arrivalTime = document.querySelectorAll('.arrivalTime')
const departureTime = document.querySelectorAll('.departureTime')
// ------------ Cheepest and Quickest toggle Buttons ------------- 
const bestWays1 = document.querySelector('.bestWay1');
const bestWays2 = document.querySelector('.bestWay2');

// input ckecboxes
const zeroTransfers = document.querySelector('.zeroTransfers')
const all = document.querySelector('.all')

console.log(zeroTransfers.defaultChecked)
console.log(all.defaultChecked)

fetch('https://front-test.beta.aviasales.ru/search')
    .then(res => {
        return res.json()
    })
    .then(data => {
        fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${data.searchId}`)
        .then(res => {
            // console.log("RESPONSE, WAITING TO PARSE...", res)
            return res.json()
        })
        .then(data => {
            console.log(data.tickets)
            var mainData = data.tickets;
            bestWays1.onclick = function () {
                bestWays1.style.backgroundColor="dodgerblue";
                bestWays1.style.color = "#f6f6f6";
                bestWays2.style.backgroundColor="rgb(246, 246, 246)";
                bestWays2.style.color = "#000000";
                console.log(bestWays1.style.backgroundColor)
                // ни на что не вляет, будто и нет:
                // mainData = mainData.sort(function (a, b){
                //     if(a.price < b.price) return -1
                // })    
            }    
            bestWays2.onclick = function () {
                bestWays2.style.backgroundColor="dodgerblue";
                bestWays2.style.color = "#f6f6f6";
                bestWays1.style.backgroundColor="rgb(246, 246, 246)";
                bestWays1.style.color = "#000000";
                console.log(bestWays1.style.backgroundColor)
                // ни на что не вляет, будто и нет:
                // mainData = mainData.sort(function (a, b){
                //     if((a.segments[0].duration + a.segments[1].duration) < (b.segments[0].duration + b.segments[1].duration)) return -1 
                // })
            }
            // -----------------Price------------
            // order data based on price
            
            console.log(bestWays2.style.backgroundColor) // if wtite style inline in html file - contain color("dodgerblue")
            // не работает как нужно, почему то не обновляются данные, хотя цвет уже поменялся, что то вроде useEffect нужно...
            {bestWays1.style.backgroundColor == "dodgerblue" ? mainData.sort(function (a, b){
                if(a.price < b.price) return -1;
                if(a.price > b.price  ){
                    // if a should come before b return - ( -1, -2...<0), if b come before a - (1, 2, 3...>0), if they "=" return 0
                    return 1;
                }
                return 0;
            }) : mainData.sort(function (a, b){
                if((a.segments[0].duration + a.segments[1].duration) < (b.segments[0].duration + b.segments[1].duration)) return -1 })}
                
                // sort by Stops, снова никак не воздействует после нажатия... 
                // zeroTransfers.onclick = function () {
                    //     newData.sort(function(a){
            //         if(a.segments[0].stops.length == 0 && a.segments[1].stops.length == 0 ){
                //             // why when u wtite other numbers (0, 1...)it's not work???
                //             // -1 == false
                //             return -1;
            //         }
            //     })
            //     console.log("it's not effect to entire")
            // } 
            // {zeroTransfers.defaultChecked == false ? mainData.sort(function(a){
            //     if(a.segments[0].stops.length == 0 && a.segments[1].stops.length == 0 ){
            //         // why when u wtite other numbers (0, 1...)it's not work???
            //         // -1 == false
            //         return -1;
            //     }
            // }) : null}

            var newData = []

            {  zeroTransfers.checked == true ? newData = mainData.filter(function (e) {
                return e.segments[1].stops.length == 0 && e.segments[0].stops.length == 0;
            }) : newData = mainData}

            // only in console see it, but not in UI
            zeroTransfers.onclick = function () {
                if(zeroTransfers.checked == true){
                    newData = mainData.filter(function (e) {
                    return e.segments[1].stops.length == 0 && e.segments[0].stops.length == 0;
                    })
                    console.dir(zeroTransfers.checked)
                    console.log(newData)
                } else{
                    console.log(mainData)
                    return newData = mainData
                }
            }

            // let newOne = aviaTickets.sort(function (a, b){
            //     if(a.price < b.price) return -1;
            //     if(a.price > b.price  ){
            //         // if a should come before b return - ( -1, -2...<0), if b come before a - (1, 2, 3...>0), if they "=" return 0
            //         return 1;
            //     }
            //     return 0;
            // })
            // console.log(newOne)

            // let firstFive = newData.slice(0, 5);
            let firstFive = newData

            // console.log(firstFive)

            for(var i=0; i < 5; i++){ 


           
            // firstFive.forEach(i => { 

                // var style1 = getComputedStyle(bestWays1)
                // var backgroundColor1 = style1.backgroundColor
                // console.log(backgroundColor1)  
                // style1.backgroundColor = "rgb(240, 240, 240)"
                // var backgroundColor3 = style1.backgroundColor 
                // console.log(backgroundColor3) 
                // var style2 = getComputedStyle(bestWays2)
                // var backgroundColor2 = style2.backgroundColor
                // console.log(backgroundColor2)
                // console.log(newDat)      
                // { bestWays2.style.backgroundColor =="dodgerblue" ? mainData.sort(function (a, b){
                //     if(a.segments[0].duration < b.segments[0].duration) return -1 }) : mainData = data.tickets}
                // console.log(bestWays2.style)
                // {bestWays2.style.backgroundColor == "rgb(246, 246, 246)" ? console.log("Work") : console.log("doesn't work")}
                
                price[i].innerHTML = `${firstFive[i].price} Р`

                // -- Arrival and departure time TO some direction --             
                let totalArrMin = parseInt(`${firstFive[i].segments[0].date}`.substr(11, 2)) * 60 + parseInt(`${firstFive[i].segments[0].date}`.substr(14, 2))
                let sumTotalDurration1 = totalArrMin + firstFive[i].segments[0].duration;
                if(sumTotalDurration1 > 1440){
                    let leftNumb = sumTotalDurration1 - 1440;
                    let minArr = leftNumb - 60 * Math.floor(leftNumb / 60)
                    if(minArr < 10){
                        let minArr = `${leftNumb - 60 * Math.floor(leftNumb / 60)}0`
                        let landArrTime = `${Math.floor(leftNumb / 60)}:${minArr}`
                        arrivalTime[i].innerHTML = `${`${firstFive[i].segments[0].date}`.substr(11, 5)} - ${landArrTime}`  
                    } else{
                        let minArr = leftNumb - 60 * Math.floor(leftNumb / 60);
                        let landArrTime = `${Math.floor(leftNumb / 60)}:${minArr}`
                        arrivalTime[i].innerHTML = `${`${firstFive[i].segments[0].date}`.substr(11, 5)} - ${landArrTime}`                          
                    }
                } else {
                    let leftNumb = sumTotalDurration1;
                    let minArr = leftNumb - 60 * Math.floor(leftNumb / 60)
                    if(minArr < 10){
                        let minArr = `${leftNumb - 60 * Math.floor(leftNumb / 60)}0`
                        let landArrTime = `${Math.floor(leftNumb / 60)}:${minArr}`
                        arrivalTime[i].innerHTML = `${`${firstFive[i].segments[0].date}`.substr(11, 5)} - ${landArrTime}`  
                    } else{
                        let minArr = leftNumb - 60 * Math.floor(leftNumb / 60);
                        let landArrTime = `${Math.floor(leftNumb / 60)}:${minArr}`
                        arrivalTime[i].innerHTML = `${`${firstFive[i].segments[0].date}`.substr(11, 5)} - ${landArrTime}`                          
                    }                          
                }
                // -- Arrival and departure time FROM some direction --
                let totalDepMin = parseInt(`${firstFive[i].segments[1].date}`.substr(11, 2)) * 60 + parseInt(`${firstFive[i].segments[1].date}`.substr(14, 2))
                let sumTotalDurration2 = totalDepMin + firstFive[i].segments[1].duration;
                if(sumTotalDurration2 > 1440){
                    let leftNumb = sumTotalDurration2 - 1440;
                    let minDep = leftNumb - 60 * Math.floor(leftNumb / 60)
                    if(minDep < 10){
                        let minDep = `${leftNumb - 60 * Math.floor(leftNumb / 60)}0`
                        let landDepTime = `${Math.floor(leftNumb / 60)}:${minDep}`
                        departureTime[i].innerHTML = `${`${firstFive[i].segments[1].date}`.substr(11, 5)} - ${landDepTime}`  
                    } else{
                        let minDep = leftNumb - 60 * Math.floor(leftNumb / 60);
                        let landDepTime = `${Math.floor(leftNumb / 60)}:${minDep}`
                        departureTime[i].innerHTML = `${`${firstFive[i].segments[1].date}`.substr(11, 5)} - ${landDepTime}`                          
                    }
                } else {
                    let leftNumb = sumTotalDurration2;
                    let minDep = leftNumb - 60 * Math.floor(leftNumb / 60)
                    if(minDep < 10){
                        let minDep = `${leftNumb - 60 * Math.floor(leftNumb / 60)}0`
                        let landDepTime = `${Math.floor(leftNumb / 60)}:${minDep}`
                        departureTime[i].innerHTML = `${`${firstFive[i].segments[1].date}`.substr(11, 5)} - ${landDepTime}`  
                    } else{
                        let minDep = leftNumb - 60 * Math.floor(leftNumb / 60);
                        let landDepTime = `${Math.floor(leftNumb / 60)}:${minDep}`
                        departureTime[i].innerHTML = `${`${firstFive[i].segments[1].date}`.substr(11, 5)} - ${landDepTime}`                          
                    }                          
                }
                // ----------------Duration----------------               
                timeArrival[i].innerHTML = 
                    `${Math.floor(`${firstFive[i].segments[0].duration}` / 60)}ч`+ ' ' + 
                    `${`${firstFive[i].segments[0].duration}` - 60 * Math.floor(`${firstFive[i].segments[0].duration}` / 60)}м`
                timeDeparture[i].innerHTML = 
                    `${Math.floor(`${firstFive[i].segments[1].duration}` / 60)}ч`+ ' ' + 
                    `${`${firstFive[i].segments[1].duration}` - 60 * Math.floor(`${firstFive[i].segments[1].duration}` / 60)}м` 
                // ---------------- Transfers Arrival ----------------
                if(firstFive[i].segments[0].stops.length == 0){
                    arrivalStops[i].innerHTML = "-";
                    transfersQuantA[i].innerHTML = "Без пересадок";
                } else if(firstFive[i].segments[0].stops.length == 1){
                    arrivalStops[i].innerHTML = `${firstFive[i].segments[0].stops[0]}`
                    transfersQuantA[i].innerHTML = "1 пересадка"
                } else if (firstFive[i].segments[0].stops.length == 2){
                    arrivalStops[i].innerHTML = `${firstFive[i].segments[0].stops[0]}, ${firstFive[i].segments[0].stops[1]}`
                    transfersQuantA[i].innerHTML = "2 пересадки"
                } else {
                    arrivalStops[i].innerHTML = `${firstFive[i].segments[0].stops[0]}, ${firstFive[i].segments[0].stops[1]}, ${firstFive[i].segments[0].stops[2]}`
                    transfersQuantA[i].innerHTML = "3 пересадки"
                }
                // ---------------- Transfers Departure ----------------
                if(firstFive[i].segments[1].stops.length == 0){
                    departureStops[i].innerHTML = "-";
                    transfersQuantD[i].innerHTML = "Без пересадок";
                } else if(firstFive[i].segments[1].stops.length == 1){
                    departureStops[i].innerHTML = `${firstFive[i].segments[1].stops[0]}`;
                    transfersQuantD[i].innerHTML = "1 пересадка";
                } else if (firstFive[i].segments[1].stops.length == 2){
                    departureStops[i].innerHTML = `${firstFive[i].segments[1].stops[0]}, ${firstFive[i].segments[1].stops[1]}`
                    transfersQuantD[i].innerHTML = "2 пересадки";
                } else {
                    departureStops[i].innerHTML = `${firstFive[i].segments[1].stops[0]}, ${firstFive[i].segments[1].stops[1]}, ${firstFive[i].segments[1].stops[2]}`
                    transfersQuantD[i].innerHTML = "3 пересадки";
                }
            }
        })    
        .catch(e => {
            console.log("ERROR INSIDE", e)
        })    
    })
    .catch(e => {
        console.log("ERROR OUTSIDE", e)
})


