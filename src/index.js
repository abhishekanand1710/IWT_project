var firestore = firebase.firestore();

const login = document.querySelector('#login');
const usn = document.querySelector('#usn');  
const psw = document.querySelector('#psw');    

// authentication of user

login.addEventListener("click",function() {
        // var usn=/^[1-4][A-Z][A-Z][0-9][0-9][A-Z][A-Z][0-9][0-9][0-9]$/;
        // var psw=/^[0-9][0-9][/][0-9][0-9][/][0-9][0-9][0-9][0-9]$/;
        console.log("function called");
        var usnv = usn.value;
        var pswv = psw.value;
        console.log(usnv,pswv);

        firestore.collection('Students').doc(usnv).get().then(function(doc) {
            console.log("inside f1");
            if (doc.exists) {
                console.log("Document data:", doc.data());
                if(pswv === doc.data().DOB){
                    // Store
                    localStorage.setItem("DOB", doc.data().DOB);
                    localStorage.setItem("name", doc.data().name);
                    localStorage.setItem("usn", usnv);
                    // Retrieve
                    
                    window.location.href = './home.html';
                    console.log("Logged in");
                }
                }
            else {
                // doc.data() will be undefined in this case
                console.log("wrong  password");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
     
    }
)