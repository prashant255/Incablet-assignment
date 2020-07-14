let sortDirection = false;

const url = new URL("https://incablet-assign.herokuapp.com/users")

fetch(url).then((response) => {
    response.json().then((data) => {
            loadTableData(data);
    })       
})

function loadTableData(personData) {
    const tableBody = document.getElementById('tableData');
    let datahtml = '';

    for(let person of personData) {

        const res = person.date.split("T")

        datahtml += '<tr><td>' + '<img src = "data:image/jpg;base64,' + person.profilePicture +
                     '"</td><td><br><br>' + person.name + 
                     '</td><td><br><br>' + person.id +
                     '</td><td><br><br>' + person.gender +
                     '</td><td><br><br>' + person.age +
                     '</td><td id ="status">    <br><br>' + person.status +
                     '</td><td><br><br>' + res[0] + '</td></tr>';
    }

    tableBody.innerHTML = datahtml;
}
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

var img = {}

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            img = document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
  });

document.addEventListener('DOMContentLoaded', ()=> {
    document
    .getElementById('form')
    .addEventListener('submit', handleForm)
});

async function handleForm(ev) {
    ev.preventDefault();
    let form = ev.target; 
    let fd = new FormData(form);
    let json = await convertFD2JSON(fd);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: json
    };
    fetch(url, options);
    alert("Submission suceesful!"); 
    
}

function convertFD2JSON(FormData) {
    let obj = {};
    for (let key of FormData.keys()) {
        obj[key] = FormData.get(key);
        if(key === 'profilePicture')
            obj[key] = getBase64Image(img);
    }
    return JSON.stringify(obj);
}