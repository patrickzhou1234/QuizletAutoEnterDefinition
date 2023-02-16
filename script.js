// ==UserScript==
// @name         Quizlet Autoenter Definition
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://quizlet.com/*/autosaved
// @icon         https://www.google.com/s2/favicons?sz=64&domain=quizlet.com
// @grant        none
// ==/UserScript==

var wordList = ["Restitution", "Rehabilitation", "Dissemination", "Expansive", "Magnitude", "Writhing", "Contempt"];
var i = 0,
    j = 1;

window.onload = function () {
    for (i = 0; i < wordList.length; i++) {
        document.getElementById("addRow").click();
    }
    i = 0;
    while (true) {
        if (i == wordList.length) {
            break;
        }
        document.querySelectorAll("p")[j].textContent = wordList[i];
        j += 2;
        i++;
    }
    (i = 0), (j = 0);
    var myint = setInterval(() => {
        if (i == wordList.length) {
            clearInterval(myint);
            return;
        }
        fetch("https://quizlet.com/webapi/3.2/suggestions/definition?clientId=-11270781944352942&limit=3&word=" + wordList[i] + "&definition=&defLang=en&localTermId=-1&prefix=", {
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
            },
            referrer: "https://quizlet.com/772024908/autosaved",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
            .then((response) => response.text())
            .then((data) => {
                JSON.stringify(data);
                document.querySelectorAll("p")[j].textContent = data.substring(data.indexOf('"text":') + 8, data.indexOf(',"id"') - 1);
            });
        j += 2;
        i++;
    }, 1000);
};
