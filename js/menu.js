let burger = document.querySelector('.burger')
let mobile_menu = document.querySelector('.mobile_menu')

let burger_line1 = document.querySelector('.burger > div:nth-child(1)')
let burger_line2 = document.querySelector('.burger > div:nth-child(2)')

let burger_line3 = document.querySelector('.burger > div:nth-child(3)')

burger.addEventListener('click', () => {
    //закриваємо меню
    if (mobile_menu.classList.contains('mobile_menu_open')) {
        mobile_menu.classList.remove('mobile_menu_open')
        
        burger_line1.classList.remove('mobile_line1_open')
        burger_line2.classList.remove('mobile_line2_open')
        burger_line3.classList.remove('mobile_line3_open')
    }
    //відкриваємо меню
    else {
        mobile_menu.classList.add('mobile_menu_open')
        
        burger_line1.classList.add('mobile_line1_open')
        burger_line2.classList.add('mobile_line2_open')
        burger_line3.classList.add('mobile_line3_open')
    }
})

