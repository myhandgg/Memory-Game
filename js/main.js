// on load go to top
window.onload = () => {
    window.scrollTo({
        top: 0,
        left: 0
    })
}

// start game button and name
let boxes = document.querySelectorAll(".cards-container .box")

document.querySelector(".start-game").onclick = () => {
    let promptMessage = prompt("Enter your name")
    document.querySelector("header p span").textContent = promptMessage
    if (promptMessage === null || promptMessage === "") {
        document.querySelector("header p span").textContent = "Unknown"
    }
    document.querySelector(".overlay").style.display = "none"
    document.querySelector(".start-game").style.display = "none"
    document.querySelector("body").style.overflow = "auto"
    boxes.forEach((e) => {
        e.style.transform = "rotateY(180deg)"
        e.classList.add("pointer-event")
        setTimeout(() => {
            e.style.transform = "rotateY(0deg)"
            e.classList.remove("pointer-event")
        }, 2000)
    })
}

// select difficulty
document.querySelector("header i").onclick = () => {
    document.querySelector("header ul").classList.toggle("show")
}

let difficulty = document.querySelector(".difficulty span") 

let time = document.querySelector(".time p span")

let lis = document.querySelectorAll("ul li")

let icon = document.querySelector("header i")

lis.forEach((e) => {
    e.onclick = () => {
        document.querySelector("header ul").classList.remove("show")
        icon.style.display = "none"
        boxes.forEach((e) => {
            e.style.order = Math.floor(Math.random() * boxes.length)
            e.style.transform = "rotateY(180deg)"
            e.style.transform = "rotateY(180deg)"
            e.classList.add("pointer-event")
            setTimeout(() => {
                e.style.transform = "rotateY(0)"
                e.classList.remove("pointer-event")
            }, 5000);
        })
        difficulty.textContent = e.textContent
        if (difficulty.textContent === lis[0].textContent) {
            easy()
        } else if (difficulty.textContent === lis[1].textContent) {
            normal()
        } else if (difficulty.textContent === lis[2].textContent) {
            hard()
        } else if (difficulty.textContent === lis[3].textContent) {
            extreme()
        }
    }
})

// making time decrease by 1 every second
let cardsContainer = document.querySelectorAll(".cards-container")

let intervalTime = setInterval(() => {
    time.textContent -= 1
    if (time.textContent <= 0) {
        time.textContent = 0
        document.querySelector(".lost").style.display = "flex"
        document.querySelector("body").style.overflow = "hidden"
        boxes.forEach((e) => {
            e.style.transform = "rotateY(180deg)"
        })
    }
}, 1000)

cardsContainer.onclick = () => {
    time.textContent = 60
}

// Game functions

let tries = document.querySelector(".tries p span")

let fails = document.querySelector(".fails p span")

let disable = false

boxes.forEach((e) => {
    e.style.order = Math.floor(Math.random() * boxes.length)
    e.onclick = () => {
        document.querySelector("footer").style.display = "flex"
        e.classList.add("flliped")
        e.style.transform = "rotateY(180deg)"
        if (document.querySelectorAll(".flliped").length === 2) {
            e.parentElement.classList.add("no-flip")
            setTimeout(() => {
                e.parentElement.classList.remove("no-flip")
                let a = document.querySelectorAll(".flliped")[0]
                let b = document.querySelectorAll(".flliped")[1]
                let cardOne = a.children[1].children[0]
                let cardTwo = b.children[1].children[0]
                if (cardOne.src === cardTwo.src) {
                    a.classList.remove("flliped")
                    b.classList.remove("flliped")

                    a.classList.remove("no-match")
                    b.classList.remove("no-match")

                    a.classList.add("has-match")
                    b.classList.add("has-match")
                    


                    tries.textContent -= 1
                    if (tries.textContent <= 0) {
                        tries.textContent = 0
                        setTimeout(() => {
                            document.querySelector(".lost").style.display = "flex"
                        }, 1000);
                        window.scrollTo({
                            top: 0,
                            left: 0
                        })
                        document.querySelector("body").style.overflow = "hidden"
                        boxes.forEach((e) => {
                            e.style.transform = "rotateY(180deg)"
                        })
                        disable = true
                        if (disable) {
                            clearInterval(intervalTime)
                        }
                        document.querySelector(".play-again").onclick = () => {
                            document.querySelector(".lost").style.display = "none"
                            boxes.forEach((e) => {
                                e.style.transform = "rotateY(0)"
                                e.style.order = Math.floor(Math.random() * boxes.length)
                            })
                        }
                    }
                } else {
                    tries.textContent -= 1
                    fails.textContent = +fails.textContent + 1
                    if (tries.textContent <= 0) {
                        tries.textContent = 0
                        setTimeout(() => {
                            document.querySelector(".lost").style.display = "flex"
                        }, 1000);
                        window.scrollTo({
                            top: 0,
                            left: 0
                        })
                        document.querySelector("body").style.overflow = "hidden"
                        setTimeout(() => {
                            boxes.forEach((e) => {
                                e.style.transform = "rotateY(-180deg)"
                            })
                        }, 1000)
                        disable = true
                        if (disable === true) {
                            clearInterval(intervalTime)
                        }
                    }
                    a.classList.remove("flliped")
                    b.classList.remove("flliped")

                    a.classList.add("no-match")
                    b.classList.add("no-match")
                    
                    a.style.transform = "rotate(0deg)"
                    b.style.transform = "rotate(0deg)"
                }
            }, 1000);
        }
    }
})


document.querySelector(".play-again").onclick = () => {
    document.querySelector(".lost").style.display = "none"
    icon.style.display = "block"
    if (difficulty.textContent === lis[0].textContent) {
        easy()
    } else if (difficulty.textContent === lis[1].textContent) {
        normal()
    } else if (difficulty.textContent === lis[2].textContent) {
        hard()
    } else if (difficulty.textContent === lis[3].textContent) {
        extreme()
    }
}

function easy() {
    tries.textContent = 16
    time.textContent = 65
}

function normal() {
    tries.textContent = 12
    time.textContent = 50
}

function hard() {
    tries.textContent = 10
    time.textContent = 40
}

function extreme() {
    tries.textContent = 8
    time.textContent = 20
}