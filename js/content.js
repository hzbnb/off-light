const this_url = window.location.origin;
console.log("offLight-url",this_url)
let isDark = false;
const str = `<style id="offLight">html{filter: invert(0.9);}img {filter: invert(1);}video {filter: invert(1);}</style>`
chrome.storage.local.get(this_url).then((res) => {
    isDark = res[this_url];
    if(res[this_url]) goDark();
});

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    switch (request.type) {
        case "get_isDark":
            sendResponse( isDark );
            console.log('get_isDark',isDark)
            break;
        case "set_isDark":
            if(request.value){
                goDark();
            }else{
                goNoDark();
            }
            sendResponse( "ok" );
            break;
        default:
            break;
    }
});

function goDark(){
    isDark = true;
    $("head").prepend(
        str
    );
    chrome.storage.local.set({ [this_url]: true }).then(() => {
    });
}

function goNoDark(){
    isDark = false;
    $("style#offLight").remove();
    chrome.storage.local.set({ [this_url]: false }).then(() => {
    });
}
