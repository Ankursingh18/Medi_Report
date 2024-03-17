const firebaseConfig = {
    apiKey: "AIzaSyA33_FgsaM0cZhB0ypE3fGo4v3-NkbeQfs",
    authDomain: "report-12e64.firebaseapp.com",
    projectId: "report-12e64",
    storageBucket: "report-12e64.appspot.com",
    messagingSenderId: "637281970457",
    appId: "1:637281970457:web:902800eab47a7402fffd88",
    measurementId: "G-7XPZ2DXTW1"
  };
  

  var filetext = document.querySelector(".filetext");
var uploadpercentage = document.querySelector(".uploadpercentage");
var progress = document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");

function getfile(e) {
  fileItem = e.target.files[0];
  fileName = fileItem.name;
  filetext.innerHTML = fileName;
}

function uploadImage() {
  let storageRef = firebase.storage().ref("images/" + fileName);
  let uploadTask = storageRef.put(fileItem);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot);
      percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log(percentVal);
      uploadpercentage.innerHTML = percentVal + "%";
      progress.style.width = percentVal + "%";
    },
    (error) => {
      console.log("error is ", error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log("URL", url);
        if (url !== "") {
          img.setAttribute("src", url);
          img.style.display = "block";
        }
      });
    }
  );
}