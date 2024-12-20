function show_item(it) {
    document.getElementById("c_item").innerHTML = it.innerHTML;
}

function init(){
    let list = ["Apple", "Orange", "Pineapple", "Coconut"];
    let l = "";
    for(let e of list)
        l += `<li onclick="show_item(this)">${e}</li>\n`; // this = special variable containing itself
    document.getElementById("l1").innerHTML = l;
}