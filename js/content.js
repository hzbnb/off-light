const this_url = window.location.origin;
console.log("offLight-url",this_url)
let isDark = false;
const myset = `${ this_url.includes('bilibili')?'.bili-video-card__stats,.mouse-in{filter: invert(1);} .bpx-state-active,#bilibili-player,.bpx-player-container,.bpx-player-video-area':'video' } {filter: invert(1);}`
const str = `<style id="offLight">html{filter: invert(0.9);}img {filter: invert(1);}${myset}</style>`
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
