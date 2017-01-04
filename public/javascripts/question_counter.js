
function verifyAnswer() {
    var selectedAnswers = findChildrenText("right-defaults");
    var unselected = findChildrenText("left-defaults");
    var mechName = document.getElementById('mechanismName').innerText;
    var payLoad = {
        mainSearch: mechName,
        selected: selectedAnswers,
        unselected: unselected
    }; //POST request will be sent through this JSON data pack.
    console.log(payLoad);
    $.ajax({
        url: "/validateAnswers",
        type: "POST",
        data: payLoad,
        success: function (data, textStatus, jqXHR) {
            console.log(data, textStatus);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textstatus, errorThrown);
        }
    });

}

//we need to find a way to create a POST REQUEST through node js in this file.
// we will take the payload JSON and use that to put through a POST request to the '/validateAnswers' path that we created in app.js and validate.js

function findChildrenText(containerID) {
    var answerContainer = document.getElementById(containerID);
    var childrenCount = answerContainer.childNodes.length;
    var answerList2 = [];
    for (var i = 0; i < childrenCount; i++) {
        if (answerContainer.childNodes[i].nodeType != 3) {
            // console.log(answerContainer.childNodes[i].innerHTML);
            answerList2.push(answerContainer.childNodes[i].innerHTML);
        }

    }
    // console.log(answerList2);
    return answerList2;
}





// function readDropZone () {

//     var totalDropped = document.getElementById("right-defaults").childElementCount;

//     console.log(totalDropped);

// }





//  var answers = document.getElementById("div");
//  var children = answers.children;
//  console.log(children);


