
//intialise number of parametrs
let addedParamCount = 0;

//utulity function
//1. utility function to get DOM element from string
function getElemetFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//hide parametersBox initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//if user click params box hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

//if user click json box hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//if the user click on + button, add more parametrs
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                </div>
                <button  class="btn btn-primary deleteParam"> - </button>
                </div>`
    //convert the element string to DOM Node
    let paramElement = getElemetFromString(string);
    params.appendChild(paramElement);
    // Add a evetnListener to remove parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            //Add a confirmation box to delete a parameter
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;

})

//if the users click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    //Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "please wait... Fetching response";
    document.getElementById('responsePrism').innerHTML = "please wait... Fetching response";

    //fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    //if user has used params option intead of json,collect all the parametrs in the object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);

    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    //log all the values in console for debugging
    console.log(url)
    console.log(requestType)
    console.log(contentType)
    console.log(data)

    //if request type is GET, invoke a fetch api to create a GET request
    if(requestType=='GET'){
        fetch(url,{
            method:'GET',
        })
        .then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value=text;
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
        })
    }
    //if request type is get, invoke a fetch api to create a get request
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value=text;
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
        })
    }
})