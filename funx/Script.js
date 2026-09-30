function changePage(site){//sends you to another page on or off the site
    window.location.href=site;
}
function displayDropdown(){//handles the dropdown menu that can appear on mobile devices
    var drop=document.getElementById("dropDownMenu");
    if(drop.style.display==="flex"){
        drop.style.display="none";
    } else {
        drop.style.display="flex";
    }
}