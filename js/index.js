const testFolder = './static/figures/test_folder';
const fs = require('fs');
fs.readdir(testFolder, (err, files) => {
  

    files.forEach(file => {
      if (file.endsWith('.json')) {
        const fileName = file.split('.').slice(0, -1).join('.');
        console.log(file[context]);
        
        fetch(file)
          .then(function (response) {
            return response.json();
          })
          .then(function (result) {
            for (item in Obejct.keys(result)) {
              if (item == fileName)
                console.log('epoch'+i)
                console.log(result[item]);
                
                let container = document.getElementById("results-carousel3");// 整個大包裝
                console.log(container)
                onsole.log(container.childNodes[0])
                let new_child = container.childNodes[0].cloneNode();//大包裝裡面的框架: 就是已經寫好的第一個小孩

                //每個小孩裡面有: 影片，解釋
                let video = new_child.childNodes[0].childNodes[0];//影片是小孩這個container的第1個小孩
                let description = new_child.childNodes[1].childNodes[1] // new_child.childNode[1];//解釋是小孩這個container的第2個小孩
                video.childNodes[0].src = "static/figures/test_folder/"+item+"/"+item+".mp4";//[影片]的resource
                for (var i = 80; i < 85; i++) {
                  const fs = 
                  fetch('./static/figures/result_epoch/skating225/results_epoch'+i+'.json')
                    .then(function (response) {
                      return response.json();
                    })
                    .then(function (result) {
                    description.innerHTML = result[item];//[解釋]的文字

                      //最後把小孩append到大包裝裡
                      container.appendChild(new_child);
                  
                  });
                }
            };
        });
      }
  });
});
window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/

    bulmaSlider.attach();

})




                
                
