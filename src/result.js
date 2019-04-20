var firestore = firebase.firestore();

var rsem1;
var sSem1;
var blogs;
var fasts;
var r = false;
var s = false;

const name = document.querySelector('#name');
const usn = document.querySelector('#usn');
var table = document.getElementById("table6EXT");
var namev = localStorage.getItem("name");
var usnv = localStorage.getItem("usn");

function getResult(){
    rsem1 = [];
    sSem1 = [];
    blogs = [];
    fasts = [];
    table.innerHTML = null;
    name.innerHTML = namev;
    usn.innerHTML = "USN:- " + usnv;
    getBacklogs();
    getFasttracks();
    getSemResult();
    getSCode();
    if(r && s){
        insertInTable();
    }
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
            rsem1.push(doc.data().grade);
            console.log(rsem1);
            r = true;
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
            sSem1.push({"code":doc.data().code, "sub":doc.data().name});
            console.log(sSem1);
            if(sSem1.length === 8 && rsem1.length === 8){
                insertInTable();
                addLists(blogs, 'backlist', 'primary', 'back');
                addLists(fasts, 'fastlist', 'success', 'fast');
            }
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function getBacklogs() {
    console.log("backlogs");
    firestore.collection("Students/"+usnv+"/Backlogs")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            blogs.push({"code":doc.data().code, "sub":doc.data().name});
            console.log(blogs);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    console.log("function called2");
}

function getFasttracks() {
    console.log("fasttracks");
    firestore.collection("Students/"+usnv+"/Fastrack")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            fasts.push({"code":doc.data().code, "sub":doc.data().name});
            console.log(fasts);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    console.log("function called2");
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
function addLists(list, parentid, color, eid) {
    console.log("New note");
    for(i=0; i<list.length; i++){
        // increment fileId to get a unique ID for the new element
        var html = '<div class="list-group-item list-group-item-'+ color + ' d-flex w-100 justify-content-between">'+
        '<h6 class="m-1">'+list[i].code.toUpperCase()+'</h6><text>'+ list[i].sub+'</text></div>';
        addElement(parentid, 'div', eid + i, html);
        console.log("added");
    }
}
//////////////////////////////////////////////////

const cgpa = document.querySelector('#cgpa');

function insertInTable(){
    gradeSum = 0;
    for(i=0;i<8;i++){
        
        var row = table.insertRow(i);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var sno = row.insertCell(0);
        sno.innerHTML = i+1;
        var cell1 = row.insertCell(1);
        cell1.innerHTML = sSem1[i].code;
        var cell2 = row.insertCell(2);
        cell2.innerHTML = sSem1[i].sub;
        var cell2 = row.insertCell(3);
        cell2.innerHTML = rsem1[i]; 
        
        gradeSum += rsem1[i];
    }

    cgpa.innerHTML = "CGPA:- " + gradeSum/rsem1.length;
}