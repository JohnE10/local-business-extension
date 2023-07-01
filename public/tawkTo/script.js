

// remove branding and some elements from top menu

var rB = function () {
    try {

        // var element = document.querySelector("iframe[title*=chat]:nth-child(2)").contentDocument.querySelector(`a[class*=tawk-branding]`)

        // if (element) {
        //     element.remove()
        // }

        // var element2 = document.querySelector("iframe[title*=chat]:nth-child(2)").contentDocument.querySelector(`a[class*=tawk-text-left]`)

        // if (element2) {
        //     element2.remove()
        // }

        // var element4 = document.querySelector("iframe[title*=chat]:nth-child(2)").contentDocument.querySelector(`button[class*=tawk-text-left]:nth-child(4)`)

        // var element5 = document.querySelector("iframe[title*=chat]:nth-child(2)").contentDocument.querySelector(`button[class*=tawk-text-left]:nth-child(5)`)

        // // if (element4 && element5) {
        // //     element4.before(element5)
        // // }

    } catch (e) { }
}

var tick = 1

setInterval(rB, tick)

// end remove branding and some elements from top menu

// Start of Tawk.to Script

var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/649b2d6194cf5d49dc602e81/1h3v2ii2f';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

// End of Tawk.to Script

