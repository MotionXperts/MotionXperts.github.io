
  
const testFolder = './test_folder';
const result_epoch = './result_epoch/skating225';
let file_length, folder_name;

async function loadJson(node, path) {    
    await fetch(path)
        .then(function (response) {
          return response.json();
        }).then((result)=>{
            node.innerHTML += result[0]["context"];             
        });
}

async function loadEpoch(node, path, video_name) {    
  await fetch(path)
      .then(function (response) {
        return response.json();
      }).then((result)=>{
          node.innerHTML += result[video_name];             
      });
}
async function loadText(){    
    await fetch(  testFolder + "/index.txt")
        .then(function (response) {
          return response.text();
        }).then(async function (result) {
          file_length = result.split('\n').length;
          folder_name = result.split("\n").map(element => element.replace(/\r$/, ''));     
        });
  }
  
  

window.addEventListener("load", async function() {
    await loadText();
    for(let i=0; i<file_length-1; i++){
        //json path and video path
        json_path = testFolder + "/" + folder_name[i]+"/"+folder_name[i] + ".json";         
        //clone new child
        let container = document.getElementById("container");             
        let new_child = container.firstElementChild.cloneNode(true);    
        video_arr = parent.document.querySelectorAll("img")
        //fill the content of video, title, and description      
        new_child.children[0].innerHTML += folder_name[i]; //title 
        epoch = 80; 
        for (let j=0; j<5;j++){
          video_path = "./epoch"+str(epoch+j)+"/"+folder_name[i] + ".gif";
          video_arr[j].src = video_path;
        }
        text_arr = parent.document.querySelectorAll("p")
        await loadJson(text_arr[0], json_path);
        for (let j=0; j<5;j++){
            epoch = j + 80;
            epoch_path = result_epoch + "/results_epoch" + epoch + ".json"; 
            await loadEpoch(text_arr[1+j], epoch_path,folder_name[i]);
        }
        //append new child to container
        container.appendChild(new_child);
    }
})

