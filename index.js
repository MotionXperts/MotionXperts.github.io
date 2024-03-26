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
    await fetch("./test_folder/index.txt")
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
          video_path = "./epoch"+(epoch+j).toString()+"/"+folder_name[i] + ".gif";
          video_arr[j].src = video_path;
        }
        text_arr = parent.document.querySelectorAll("h4")
        await loadJson(new_child.children[1], json_path);
        prediction_arr = parent.document.querySelectorAll("p")
        for (let j=0; j<5;j++){
            epoch_path = result_epoch + "/results_epoch" + (epoch+j).toString() + ".json"; 
            await loadEpoch(prediction_arr[j], epoch_path,folder_name[i]);
        }
        //append new child to container
        container.appendChild(new_child);
    }
})

/*

3D Carousel images gallery. inspired from David DeSandro's tutorial (https://3dtransforms.desandro.com/)

*/

window.addEventListener('load', function() {
  carouselRUN();
}, false);

function carouselRUN() {
  var carousel = document.getElementById("carousel");
  var scene = document.getElementById("scene");
  var carousel_items_Arrey = document.getElementsByClassName("carousel_item");
  var carousel_btn = document.getElementById("carousel_btn");
  var n = carousel_items_Arrey.length;
  var curr_carousel_items_Arrey = 0;
  var theta = Math.PI * 2 / n;
  var interval = null;
  var autoCarousel = carousel.dataset.auto;

  setupCarousel(n, parseFloat(getComputedStyle(carousel_items_Arrey[0]).width));
  window.addEventListener('resize', function() {
      clearInterval(interval);
      setupCarousel(n, parseFloat(getComputedStyle(carousel_items_Arrey[0]).width));
  }, false);
  setupNavigation();


  function setupCarousel(n, width) {
      var apothem = width / (2 * Math.tan(Math.PI / n));
      scene.style.transformOrigin = `50% 50% ${- apothem}px`;

      for (i = 1; i < n; i++) {
          carousel_items_Arrey[i].style.transformOrigin = `50% 50% ${- apothem}px`;
          carousel_items_Arrey[i].style.transform = `rotateY(${i * theta}rad)`;
      }

      if (autoCarousel === "true") {
          setCarouselInterval();
      }
  }

  function setCarouselInterval() {
      interval = setInterval(function() {
          curr_carousel_items_Arrey++;
          scene.style.transform = `rotateY(${(curr_carousel_items_Arrey) * -theta}rad)`;
      }, 3000);
  }

  function setupNavigation() {
      carousel_btn.addEventListener('click', function(e) {
          e.stopPropagation();
          var target = e.target;

          if (target.classList.contains('next')) {
              curr_carousel_items_Arrey++;
          } else if (target.classList.contains('prev')) {
              curr_carousel_items_Arrey--;
          }
          clearInterval(interval);
          scene.style.transform = `rotateY(${curr_carousel_items_Arrey * -theta}rad)`;

          if (autoCarousel === "true") {
              setTimeout(setCarouselInterval(), 3000);
          }
      }, true);
  }
}