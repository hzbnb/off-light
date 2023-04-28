const checkbox = document.getElementById("checkbox");
if (checkbox) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                type: "get_isDark"
            },
            function(response) {
                switch (response) {
                    case true:
                        checkbox.checked = true;
                        break;
                    default:
                        break;
                }
            }
        );
    });
    checkbox.onclick = function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    type: "set_isDark",
                    value :checkbox.checked,
                },
                function(response) {
                    if(!response) {
                        alert("第一次使用请刷新网页后 再点关灯～")
                        return;
                    }
                    setTimeout(() => {
                        window.close();
                    }, 100);
                }
            );
        });
    };
}









