document.querySelector(".control-buttons span").onclick = function () {

    let yourName = prompt("whats Your Name?");

    if (yourName == null || yourName == "") {

        document.querySelector(".info-container .name span").innerHTML = "Unkown";
        document.getElementById("start").play();
        countDown(120);

    } else {
        
        document.querySelector(".info-container .name span").innerHTML = yourName;
        document.getElementById("start").play();
        countDown(120);

    }

    document.querySelector(".control-buttons").remove();

};

let countDownInterval;
let countDownElement = document.querySelector(".timer")
let navigation = document.querySelector(".navigation");

function countDown (duration) {

    let minuts, seconds;
    countDownInterval = setInterval(function () {

        minuts = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        countDownElement.innerHTML = `${minuts}:${seconds}`;
        
        if (--duration < 0) {
            
            clearInterval(countDownInterval);
            if (anwserWrite !== 10) {
                navigation.classList.add("result");
                document.querySelector(".navigation p").innerHTML = `sorry, You lose`;
                document.getElementById("start").pause();
                document.getElementById("lose").play();
            }
            document.querySelector(".navigation span").onclick = function () {
                window.location.reload();
            }

        }

    },500)

}

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

// console.log(orderRange);

shuffle(orderRange);

// console.log(orderRange);

// let orderRange = Array.from(Array(blocks.length).keys())

blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener("click", function() {
        
        flipBlock(block);

    })

})


function flipBlock(selectedBlock) {
    
    selectedBlock.classList.add("is-flipped");

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    if (allFlippedBlocks.length === 2) {
        
        stopCliking();

        checkBlock(allFlippedBlocks[0], allFlippedBlocks[1]);

        // console.log('Two Flipped Blocks Selected');

    }
    
}

function stopCliking() {

    blocksContainer.classList.add("No-click");

    setTimeout(() => {

        blocksContainer.classList.remove("No-click");

    }, duration)

}

let anwserWrite = 0;
console.log(anwserWrite)

function checkBlock(firstBlock, secoundBlock) {

    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secoundBlock.dataset.technology) {

        firstBlock.classList.remove("is-flipped");
        secoundBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secoundBlock.classList.add("has-match");
        anwserWrite++;
        console.log(anwserWrite);

        document.getElementById("succses").play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            
            firstBlock.classList.remove("is-flipped");
            secoundBlock.classList.remove("is-flipped");
            
        }, duration)
        document.getElementById("wrong").play();
        // secoundBlock.classList.remove("is-flipped");

    }

    if (anwserWrite == 10) {
        
        navigation.classList.add("result");
        document.querySelector(".navigation p").innerHTML = `Congratulation, You Win`;
        document.getElementById("start").pause();
        document.getElementById("win").play();
        document.getElementById("lose").pause();
    }

}



function shuffle(array) {

    let current = array.length,temp,random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;

    }

    return array;

}




