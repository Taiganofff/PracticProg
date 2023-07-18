// wrapper з усіма слайдамии
let slider_wrapper = document.querySelector('.slider_wrapper')
// всі слайди
let slides = document.querySelectorAll('.slider_item')
// ширина екрану
let window_width = window.innerWidth
// позиція слайдера
let position = 1
// беремо ширину i margin неактиного слайда
let shirina_big = slides[0].clientWidth
let shirina = slides[1].clientWidth
let margin = slides[0].offsetLeft

// вираховуємо ширину кроку
let step = shirina + margin * 2

// введемо змінну де будемо зберігати значення відступу
let left = 0

let slide_tabs = document.querySelectorAll('.slider_tab')
// зміна висота скрол зони
let slider_scroll_zona = document.querySelector('.slider_scroll_zona')
slider_scroll_zona.style.height = document.querySelector('.slider_item_active').clientHeight + 'px'

// функція вирівнювання положення
function reset_leveling(slide, shirina = null) {
    let this_shirina = slide.clientWidth
    if (shirina != null) {
        this_shirina = shirina
    }
    left = (window_width / 2 - this_shirina / 2 - slide.offsetLeft)
    slider_wrapper.style.left = left + 'px'
}

reset_leveling(slides[0])




function go_to_slide(slide) {
    // ігноруємо клік по активному слайду
    if (slide.classList.contains('slider_item_active') != true) {

        // білий квадратик робимо звичайним
        for (let i = 0; i < slide_tabs.length; i++) {
            if (slide_tabs[i].classList.contains('slider_tab_active')) {
                slide_tabs[i].classList.remove('slider_tab_active')
            }
        }

        // йдемо циклом по всім слайдам (перебираємо)
        for (let i = 0; i < slides.length; i++) {

            // якщо слайд активний
            if (slides[i].classList.contains('slider_item_active')) {
                slides[i].classList.remove('slider_item_active')

                reset_leveling(slides[i], shirina)
                position = i

            }
        }

        for (let i = 0; i < slides.length; i++) {
            //якщо слайд по якому ми клікнули відповідає слайду
            // в циклі - добуваємо його номер
            if (slides[i] == slide) {
                // вираховуємо періщення
                let transition = i - position
                // console.log(`${position} номер старого слайда`)
                // console.log(`${i} номер нового слайда`)
                // console.log(`${transition} наскільки слайдів посунутись`)
                left = (left - (step * transition))
                slider_wrapper.style.left = left - (shirina_big - shirina) / 2 + 'px'



            }

        }

        slide.classList.add('slider_item_active')
        
        // робимо квадратик білим
        for (let i = 0;i < slides.length; i++) {
            if (slide == slides[i]) {
                slide_tabs[i].classList.add('slider_tab_active')
            }
        }

        // мобільна адаптація
        if (window.matchMedia('(max-width: 659px)').matches){
            
      

            slider_scroll_zona.style.height = document.querySelector('.slider_item_active').clientHeight + 'px'

            
        }

    }
}




function find_slide_and_start(slide_tab) {
    if (slide_tab.classList.contains('slider_tab_active') != true) {
        

        // запускаємо функцію переміщення
        for (let i = 0; i < slide_tabs.length; i++) {
            if (slide_tabs[i] == slide_tab) {
                go_to_slide(slides[i])
            }
        }

    }

}


// Тач по слайдеру
slider_scroll_zona.addEventListener('touchstart', handleTouch_Start)
slider_scroll_zona.addEventListener('touchmove', handleTouch_Move)
slider_scroll_zona.addEventListener('touchend', function() {
    start_move = false
})

let firstTouch = null
let secondTouch = null
let xdiff = null
let start_move = false
let prevSlide = null
let nextSlide = null

function handleTouch_Start(event) {
    firstTouch = event.touches[0]
}

function handleTouch_Move(event) {
    secondTouch = event.touches[0]
    xdiff = secondTouch.clientX - firstTouch.clientX
    if (start_move == false) {
    
        //перевірка мінімального кроку
        if (Math.abs(xdiff) > 50) {

            for (let i = 0;i<slides.length;i++) {
                if (slides[i].classList.contains('slider_item_active')) {
                    prevSlide = slides[i - 1]
                    nextSlide = slides[i + 1]
                }
            }


            //перевірка напрямку руху
            if (xdiff > 0) {
                if (prevSlide != undefined) {
                    go_to_slide(prevSlide)
                }

            } else {
                if (nextSlide != undefined) {
                    go_to_slide(nextSlide)
                }
            }

            start_move = true
            
        }

    }
}

