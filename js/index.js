window.addEventListener('load', function() {

    var nav = document.querySelector('.head_nav');
    var lis = nav.children;
    var img = document.querySelector('.img_nav');
    var head = document.querySelector('.head');
    for (var i = 1; i < lis.length; i++) {

        lis[i].onmouseover = function() {
            this.children[1].style.display = 'block'
        }
        lis[i].onmouseout = function() {
            this.children[1].style.display = 'none'
        }
    }

    document.addEventListener('scroll', function() {
        // console.log(window.pageYOffset);
        if (window.pageYOffset == 0) {

            head.className = 'head';
        } else {
            head.className = 'head h_bag';
        }
        console.log(img.scrollTop);


    })

    var prev_btn = document.querySelector('.prev_btn');
    var next_btn = document.querySelector('.next_btn');


    img.addEventListener('mouseenter', function() {
        prev_btn.style.display = 'block';
        next_btn.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    img.addEventListener('mouseleave', function() {
        prev_btn.style.display = 'none';
        next_btn.style.display = 'none';
        timer = setInterval(function() {
            next_btn.click();
        }, 2000);
    });

    var u = document.querySelector('.img_nav_1');
    var uu = document.querySelector('.img_nav_2');
    var ol = u.children;
    var img_nav = document.querySelector('.img_nav')

    ol[0].className = 'current';
    for (var i = 0; i < ol.length; i++) {
        ol[i].addEventListener('click', function() {

            for (var i = 0; i < ol.length; i++) {
                ol[i].className = '';
                ol[i].setAttribute('index', i);
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            var img_width = -(img_nav.offsetWidth * index);
            animate(uu, img_width);

        })
    }
    var num = 0;
    var circle = 0;
    var flag = true;
    next_btn.addEventListener('click', function() {
        if (flag) {
            // 关闭节流阀
            flag = false;
            if (num == uu.children.length - 1) {
                uu.style.left = 0;
                num = 0;
            }
            num++;
            animate(uu, -(img_nav.offsetWidth * num), function() {
                //开启节流阀
                flag = true;
            });
            circle++;
            if (circle == 5) {
                circle = 0;
            }
            for (var i = 0; i < ol.length; i++) {
                ol[i].className = '';
            }

            ol[circle].className = 'current';
        }


    })
    prev_btn.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = uu.children.length - 1;
                uu.style.left = (-num * img_nav.offsetWidth) + 'px';
            }
            num--;
            animate(uu, -(img_nav.offsetWidth * num), function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = 4;
            }
            for (var i = 0; i < ol.length; i++) {
                ol[i].className = '';
            }

            ol[circle].className = 'current';
        }

    })
    var timer = setInterval(function() {
        next_btn.click();
    }, 2000);
})