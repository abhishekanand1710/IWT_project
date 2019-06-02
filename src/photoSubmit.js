var firestore = firebase.firestore();

var usnv = localStorage.getItem('usn');


var table = document.getElementById("revalTable");

var photoPrice = 500.0;

var rSem;
var sSem;
var rSubs;
var subSelect;


function onPhotoLoad(){
    rSem = [];
    sSem = [];
    rSubs= [];
    subSelect = [];
    table.innerHTML = null;
    getSemResult();
    getSCode();
}


function getSemResult() {
    // var usn=/^[1-4][A-Z][A-Z][0-9][0-9][A-Z][A-Z][0-9][0-9][0-9]$/;
    // var psw=/^[0-9][0-9][/][0-9][0-9][/][0-9][0-9][0-9][0-9]$/;
    console.log("function called");
    firestore.collection("Results/CS/Results/1DS16CS005/sem1")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            rSem.push(doc.data().grade);
            console.log(rSem);

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    console.log("function called2");
}


function getSCode(){
    firestore.collection("Results/CS/sem1")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            sSem.push(
                {
                    "code":doc.data().code, 
                    "sub":doc.data().name
                }
            );
            console.log(sSem);
            if(sSem.length === 8 && rSem.length === 8){
                insertInTable();
            }
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}


var credits = [4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0];

function insertInTable(){

    for(i=0;i<8;i++){
        
        var row = table.insertRow(i);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  
        var cell1 = row.insertCell(0);
        cell1.innerHTML = sSem[i].code;
        var cell2 = row.insertCell(1);
        cell2.innerHTML = sSem[i].sub;
        var cell2 = row.insertCell(2);
        
        var cell2 = row.insertCell(3);
        cell2.innerHTML = credits[i]; 
        var cell2 = row.insertCell(4);
        cell2.innerHTML = rSem[i]; 
        var cell2 = row.insertCell(5);
        cell2.innerHTML = '<input type="checkbox" id= "check'+i+'" value={{this}} onclick="onChanged(this)"></input>';

    }
}


var count = document.querySelector('#count');

function onChanged(ele){

    if(ele.checked)
     subSelect.push(ele.id);
    else
    removeFromArray(subSelect, ele.id);

    console.log(subSelect);
    var rows = [];
    for(i=0;i<subSelect.length;i++){
        str = subSelect[i].replace('check', '');
        idno = parseInt(str);
        rows.push(idno);
    }

    rSubs = [];
    for(i=0; i<rows.length;i++){
        rSubs.push(sSem[rows[i]]);
    }

    console.log("rsubs",rSubs);
    document.querySelector('#selectedSubs').innerHTML = null;
    count.innerHTML = rSubs.length;
    addLists(rSubs, 'selectedSubs', 'rev');


}

function removeFromArray(arr, element){

var index = arr.indexOf(element);
if (index > -1) {
  arr.splice(index, 1);
}
}






///////////////////////////////////////////
function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
    
}
function addLists(list, parentid, eid) {
    console.log("New ele");
    for(i=0; i<list.length; i++){
        // increment fileId to get a unique ID for the new element
        var html = '<li class="list-group-item d-flex justify-content-between lh-condensed border-primary text">'+
        '<div><h6 class="my-0">'+list[i].sub+'</h6><small class="text-muted">Brief description</small></div><span class="text-muted">'+list[i].code+'</span></li>';
        addElement(parentid, 'li', eid + i, html);
        console.log("added");
    }

    var htmlPrice = '<li class="list-group-item d-flex justify-content-between  bg-dark text">'+
    '<span class="text-light text">Total (INR)</span><strong class="text-light text">'+ list.length*photoPrice +'</strong></li> ';
    addElement(parentid, 'li', 'price', htmlPrice);

}
//////////////////////////////////////////////////




function store(){
    done = true;
    console.log("inside store", rSubs);
    if(rSubs.length ==0){
        alert(" No subjects selected!\n Please select subjects to apply for revaluation.")
    }
    for(i=0;i<rSubs.length;i++){
        firestore.collection("Results/CS/Photocopy").doc(usnv).collection('Subjects').add({
            code: rSubs[i].code,
            sub: rSubs[i].sub
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            console.log(i);
            if(i==rSubs.length  && done){
                done=false;
                alert(" Payment Successfully Completed!\n Photocopy application submitted. Thank You!")
            }
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    
}


