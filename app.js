// --Main part, Tickets data--
const price = document.querySelectorAll('.price')
const timeArrival = document.querySelectorAll('.timeArrival')
const timeDeparture = document.querySelectorAll('.timeDeparture')
const arrivalStops = document.querySelectorAll('.arrivalStops')
const departureStops = document.querySelectorAll('.departureStops')
const transfersQuantA = document.querySelectorAll('.transfersQuantA')
const transfersQuantD = document.querySelectorAll('.transfersQuantD')
const arrivalTime = document.querySelectorAll('.arrivalTime')
const departureTime = document.querySelectorAll('.departureTime')

// --Cheepest and Quickest toggle Buttons -- 
const bestWays1 = document.querySelector('.bestWay1');
const bestWays2 = document.querySelector('.bestWay2');

// --input radio buttons--
const allWays = document.querySelector('.allWays')
const zeroTransfers = document.querySelector('.zeroTransfers')
const oneTransfer = document.querySelector('.oneTransfer')
const twoTransfers = document.querySelector('.twoTransfers')
const threeTransfers = document.querySelector('.threeTransfers')

fetch('https://front-test.beta.aviasales.ru/search')
    .then(res => {
        return res.json()
    })
    .then(data => {
        fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${data.searchId}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            
            console.log(data.tickets)
            var mainData = data.tickets;           
            
            // --By default search Cheepest way, without tranfers (best ways)--
            mainData.sort(function (a, b){
                if(a.price < b.price) return -1;
                if(a.price > b.price  ){
                    // if a should come before b return - ( -1, -2...<0), if b come before a - (1, 2, 3...>0), if they "=" return 0
                    return 1;
                }
                return 0;
            })                
            
            var newData = mainData.filter(function (e) {
                return e.segments[1].stops.length == 0 && e.segments[0].stops.length == 0;
            })            

            let someFunc = () => {           

                for(var i=0; i < 5; i++){    
                    
                    // -------Tickets prices --------             
                    price[i].innerHTML = `${newData[i].price} Р`
    
                    // -- Arrival and departure time TO some direction --             
                    let totalArrMin = parseInt(`${newData[i].segments[0].date}`.substr(11, 2)) * 60 + parseInt(`${newData[i].segments[0].date}`.substr(14, 2))
                    let sumTotalDurration1 = totalArrMin + newData[i].segments[0].duration;
                    if(sumTotalDurration1 > 1440){
                        let leftNumb = sumTotalDurration1 - 1440;
                        let minArr = leftNumb - 60 * Math.floor(leftNumb / 60)
                        if(minArr < 10){
                            let minArr = `${leftNumb - 60 * Math.floor(leftNumb / 60)}0`
                            let landArrTime = `${Math.floor(leftNumb / 60)}:${minArr}`
                            arrivalTime[i].innerHTML = `${`${newData[i].segments[0].date}`.substr(11, 5)} - ${landArrTime}`  
                        } else{
                            let minArr = leftNumb - 60 * Math.floor(leftNumb / 60);
                            let landArrTime = `${Math.floor(leftNumb / 60)}:${minArr}`
                            arrivalTime[i].innerHTML = `${`${newData[i].segments[0].date}`.substr(11, 5)} - ${landArrTime}`                          
                        }
                    } else {
                        let leftNumb = sumTotalDurration1;
                        let minArr = leftNumb - 60 * Math.floor(leftNumb / 60)
                        if(minArr < 10){
                            let minArr = `${leftNumb - 60 * Math.floor(leftNumb / 60)}0`
                            let landArrTime = `${Math.floor(leftNumb / 60)}:${minArr}`
                            arrivalTime[i].innerHTML = `${`${newData[i].segments[0].date}`.substr(11, 5)} - ${landArrTime}`  
                        } else{
                            let minArr = leftNumb - 60 * Math.floor(leftNumb / 60);
                            let landArrTime = `${Math.floor(leftNumb / 60)}:${minArr}`
                            arrivalTime[i].innerHTML = `${`${newData[i].segments[0].date}`.substr(11, 5)} - ${landArrTime}`                          
                        }                          
                    }
    
                    // -- Arrival and departure time FROM some direction --
                    let totalDepMin = parseInt(`${newData[i].segments[1].date}`.substr(11, 2)) * 60 + parseInt(`${newData[i].segments[1].date}`.substr(14, 2))
                    let sumTotalDurration2 = totalDepMin + newData[i].segments[1].duration;
                    if(sumTotalDurration2 > 1440){
                        let leftNumb = sumTotalDurration2 - 1440;
                        let minDep = leftNumb - 60 * Math.floor(leftNumb / 60)
                        if(minDep < 10){
                            let minDep = `${leftNumb - 60 * Math.floor(leftNumb / 60)}0`
                            let landDepTime = `${Math.floor(leftNumb / 60)}:${minDep}`
                            departureTime[i].innerHTML = `${`${newData[i].segments[1].date}`.substr(11, 5)} - ${landDepTime}`  
                        } else{
                            let minDep = leftNumb - 60 * Math.floor(leftNumb / 60);
                            let landDepTime = `${Math.floor(leftNumb / 60)}:${minDep}`
                            departureTime[i].innerHTML = `${`${newData[i].segments[1].date}`.substr(11, 5)} - ${landDepTime}`                          
                        }
                    } else {
                        let leftNumb = sumTotalDurration2;
                        let minDep = leftNumb - 60 * Math.floor(leftNumb / 60)
                        if(minDep < 10){
                            let minDep = `${leftNumb - 60 * Math.floor(leftNumb / 60)}0`
                            let landDepTime = `${Math.floor(leftNumb / 60)}:${minDep}`
                            departureTime[i].innerHTML = `${`${newData[i].segments[1].date}`.substr(11, 5)} - ${landDepTime}`  
                        } else{
                            let minDep = leftNumb - 60 * Math.floor(leftNumb / 60);
                            let landDepTime = `${Math.floor(leftNumb / 60)}:${minDep}`
                            departureTime[i].innerHTML = `${`${newData[i].segments[1].date}`.substr(11, 5)} - ${landDepTime}`                          
                        }                          
                    }
    
                    // ----------------Duration----------------               
                    timeArrival[i].innerHTML = 
                        `${Math.floor(`${newData[i].segments[0].duration}` / 60)}ч`+ ' ' + 
                        `${`${newData[i].segments[0].duration}` - 60 * Math.floor(`${newData[i].segments[0].duration}` / 60)}м`
                    timeDeparture[i].innerHTML = 
                        `${Math.floor(`${newData[i].segments[1].duration}` / 60)}ч`+ ' ' + 
                        `${`${newData[i].segments[1].duration}` - 60 * Math.floor(`${newData[i].segments[1].duration}` / 60)}м` 
                    
                    // ---------------- Transfers Arrival ----------------
                    if(newData[i].segments[0].stops.length == 0){
                        arrivalStops[i].innerHTML = "-";
                        transfersQuantA[i].innerHTML = "Без пересадок";
                    } else if(newData[i].segments[0].stops.length == 1){
                        arrivalStops[i].innerHTML = `${newData[i].segments[0].stops[0]}`
                        transfersQuantA[i].innerHTML = "1 пересадка"
                    } else if (newData[i].segments[0].stops.length == 2){
                        arrivalStops[i].innerHTML = `${newData[i].segments[0].stops[0]}, ${newData[i].segments[0].stops[1]}`
                        transfersQuantA[i].innerHTML = "2 пересадки"
                    } else {
                        arrivalStops[i].innerHTML = `${newData[i].segments[0].stops[0]}, ${newData[i].segments[0].stops[1]}, ${newData[i].segments[0].stops[2]}`
                        transfersQuantA[i].innerHTML = "3 пересадки"
                    }
    
                    // ---------------- Transfers Departure ----------------
                    if(newData[i].segments[1].stops.length == 0){
                        departureStops[i].innerHTML = "-";
                        transfersQuantD[i].innerHTML = "Без пересадок";
                    } else if(newData[i].segments[1].stops.length == 1){
                        departureStops[i].innerHTML = `${newData[i].segments[1].stops[0]}`;
                        transfersQuantD[i].innerHTML = "1 пересадка";
                    } else if (newData[i].segments[1].stops.length == 2){
                        departureStops[i].innerHTML = `${newData[i].segments[1].stops[0]}, ${newData[i].segments[1].stops[1]}`
                        transfersQuantD[i].innerHTML = "2 пересадки";
                    } else {
                        departureStops[i].innerHTML = `${newData[i].segments[1].stops[0]}, ${newData[i].segments[1].stops[1]}, ${newData[i].segments[1].stops[2]}`
                        transfersQuantD[i].innerHTML = "3 пересадки";
                    }
                }
            }
            someFunc()
            
            // ------Transfers radio buttons--------
            allWays.onclick = function () {
                if(allWays.checked == true){
                    newData = mainData;
                }
                someFunc() 
            }
            zeroTransfers.onclick = function () {
                if(zeroTransfers.checked == true){
                    // oneTransfer.checked, twoTransfers.checked, threeTransfers.checked = false;
                    newData = mainData.filter(function (e) {
                    return e.segments[1].stops.length == 0 && e.segments[0].stops.length == 0;
                    })
                    someFunc()            
                } else{
                    newData = mainData;
                }
                someFunc()
            }
            oneTransfer.onclick = function () {
                if(oneTransfer.checked == true){
                    // zeroTransfers.checked, twoTransfers.checked, threeTransfers.checked, allTransfers.checked = false;
                    newData = mainData.filter(function (e) {
                    return e.segments[1].stops.length == 1 && e.segments[0].stops.length == 1;
                    })
                    someFunc()
                } else{
                    newData = mainData;
                }
                someFunc()
            }
            twoTransfers.onclick = function () {
                if(twoTransfers.checked == true){
                    newData = mainData.filter(function (e) {
                    return e.segments[1].stops.length == 2 && e.segments[0].stops.length == 2;
                    })
                    someFunc()
                } else{
                    newData = mainData;
                }
                someFunc()
            }
            threeTransfers.onclick = function () {
                if(threeTransfers.checked == true){
                    newData = mainData.filter(function (e) {
                    return e.segments[1].stops.length == 3 && e.segments[0].stops.length == 3;
                    })
                    someFunc()           
                } else{
                    newData = mainData;
                }
                someFunc()
            }    
    
            // -----Cheepest and Quickest switch buttons-----
            bestWays1.onclick = function () {
                bestWays1.style.backgroundColor="dodgerblue";
                bestWays1.style.color = "#f6f6f6";
                bestWays2.style.backgroundColor="rgb(246, 246, 246)";
                bestWays2.style.color = "#000000";
                if(bestWays1.style.backgroundColor == "dodgerblue" ){                
                    newData = newData.sort(function (a, b){
                        if(a.price < b.price) return -1;
                        if(a.price > b.price ){
                            return 1;
                        }
                        return 0;
                    })
                    someFunc() 
                } else {
                    newData = mainData
                }    
                someFunc() 
            }    
    
            bestWays2.onclick = function () {
                bestWays2.style.backgroundColor="dodgerblue";
                bestWays2.style.color = "#f6f6f6";
                bestWays1.style.backgroundColor="rgb(246, 246, 246)";
                bestWays1.style.color = "#000000";
                if(bestWays2.style.backgroundColor == "dodgerblue" ){
                    newData = newData.sort(function (a, b){                          
                        if((a.segments[0].duration + a.segments[1].duration) < 
                        (b.segments[0].duration + b.segments[1].duration)) 
                            return -1                       
                    })     
                    someFunc()        
                } else {
                    newData = mainData
                } 
                someFunc() 
            }
        })    
        .catch(e => {
            console.log("ERROR IN WORKING WITH DATA", e)
        })    
    })
    .catch(e => {
        console.log("ERROR IN GET DATA", e)
})


