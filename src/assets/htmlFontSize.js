const MAX_FONT_SIZE = 42;

// On HTML

document.addEventListener("DOMContentLoaded", () => {
    const html = document.querySelector("html");
    var fontSize = window.innerWidth / 10;
    // console.log(window.innerWidth);// 375px
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
    html.style.fontSize = fontSize + "px";
    console.log(html.style.fontSize);
    // 设置1rem=37.5px
});
