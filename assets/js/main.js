var timerRunning = false;
var timer;

$("#trainForm").on("submit", function (event) {
    event.preventDefault();

    var trainInfo = {
        name: $('#nameInp').val().trim(),
        destination: $('#destInp').val().trim(),
        time: $('#timeInp').val().trim(),
        frecuency: $('#frecInp').val()
    };

    database.ref().push(trainInfo);
    $('#nameInp').val("");
    $('#destInp').val("");
    $('#timeInp').val("");
    $('#frecInp').val("");

});


database.ref().on("child_added", function (childSnapshot) {

    var newTr = $('<tr class="train">').append(
        $('<td>').text(childSnapshot.val().name),
        $('<td>').text(childSnapshot.val().destination),
        $('<td>').text(childSnapshot.val().frecuency)
    );
    calcNextArrival(newTr, childSnapshot.val().time, childSnapshot.val().frecuency);
    $('#trainList').append(newTr);
});

function calcNextArrival(tr, firstTime, frecuency){

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frecuency;
    var tMinutesTillTrain = frecuency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    tr.append(
        $('<td>').text(moment(nextTrain).format("hh:mm")),
        $('<td>').text(tMinutesTillTrain)
    );
}

function startTimer(){
    if (!timerRunning) {
        timerRunning = true;
        timer = setInterval(modTimer, 10000);
    }
}

function modTimer() {
    var trainList = $('.train');
    
    var nextTrainDiv = $('#nextTrain');
    nextTrainDiv.empty();
    for(var i=0;i<trainList.length;i++){
        var firstTimeConverted = moment(trainList[i].children[3].textContent, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tFrequency = trainList[i].children[2].textContent;
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        trainList[i].children[4].textContent=tMinutesTillTrain;
        trainList[i].children[3].textContent=moment(nextTrain).format("hh:mm");
        if(parseInt(tMinutesTillTrain) <2){
            console.log(trainList[i]);
            trainList[i].children[4].classList.add("nextTrain");
            var newTrainDiv = $('<div>');
            
            newTrainDiv.text('The next Train is: '+trainList[i].children[0].textContent);

            
            nextTrainDiv.append(newTrainDiv);
        }else{
            trainList[i].children[4].classList.remove("nextTrain");
        }
        
    }
};

startTimer();