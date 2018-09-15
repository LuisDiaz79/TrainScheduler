

$("#employeeForm").on("submit", function (event) {
    console.log('CLICK');
    event.preventDefault();

    var employeeInfo = {
        name: $('#nameInp').val().trim(),
        role: $('#roleInp').val().trim(),
        date: $('#dateInp').val().trim(),
        rate: $('#rateInp').val()
    };

    console.log(employeeInfo);

    database.ref().push(employeeInfo);
    $('#nameInp').val("");
    $('#roleInp').val("");
    $('#dateInp').val("");
    $('#rateInp').val("");

});


database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().date);
    console.log(childSnapshot.val().rate);
    var fDate = moment(childSnapshot.val().date).format("MM/DD/YYYY");

    var newTr = $('<tr>').append(
        $('<td>').text(childSnapshot.val().name),
        $('<td>').text(childSnapshot.val().role),
        $('<td>').text(fDate),
        $('<td>').text(childSnapshot.val().rate),
    );
    $('#empList').append(newTr);
});