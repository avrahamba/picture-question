'use strict'
var gNextId = 1
var gQuests = [
    { id: 1, ask: 'לדעת בן זומא, מאיפה לומדים שצריך להזכיר יציאת מצרים בימות המשיח?', opts: ['כל ימי חייך', 'וקדמוניות אל תתבוננו'], correctOptIndex: 0 },
    { id: 2, ask: 'מי הראשון שקרא קריאת שמע בליל חתונתו?', opts: ['רבן גמליאל', 'רבן שמעון בן גמליאל'], correctOptIndex: 0 },
    { id: 3, ask: 'מי שמתו מוטל לפניו:', opts: ['חייב בקריאת שמע', 'פטור מקריאת שמע'], correctOptIndex: 1 },
    { id: 4, ask: 'מה מברכים על החומץ?', opts: ['לא מברך', 'שהכול'], correctOptIndex: 1 },
    { id: 5, ask: 'חמישה אנשים שאכלו ביחד:', opts: ['לא נחלקים', 'נחלקים'], correctOptIndex: 0 },
    { id: 6, ask: 'מי אומר: נר ובשמים ומזון והבדלה?', opts: ['בית שמאי', 'בית הלל'], correctOptIndex: 1 }
];
var gCurrQuestIdx = 0;
var gTitle = '?כמה למדת מסכת ברכות (משנה)'
var gMistakeCount = 0;

function initGame() {
    var elBoard = document.querySelector('.board');
    var strHtml = `<h1>${gTitle}</h1>
    <div onclick="createQuests()" class="start">התחל במשחק</div>`;
    elBoard.innerHTML = strHtml;
}


// TODO - change to render quests
function createQuests() {
    var askHtml = `<div class="ask">${gQuests[gCurrQuestIdx].ask}</div>`;
    var btnsHtml = '';
    for (var i = 0; i < gQuests[gCurrQuestIdx].opts.length; i++) {
        btnsHtml += `<button onclick="checkAnswer(${i},this)" class="answer" style="margin-top: ${i * 50}px;">${gQuests[gCurrQuestIdx].opts[i]}</button>`
        btnsHtml += '<br>'
    }

    var imgSrc = `img/${gQuests[gCurrQuestIdx].id}.jpg`;
    var strHtml = `<img src="${imgSrc}">
                    <br>
                    ${askHtml}
                    <div class="opts">${btnsHtml}</div>`;
    var elBoard = document.querySelector('.board');
    elBoard.classList.add('game');
    elBoard.innerHTML = strHtml;
}

function refresh() {
    gCurrQuestIdx = 0;
    gMistakeCount = 0;
    createQuests();
}

function checkAnswer(optIdx, elBtn) {
    if (gQuests[gCurrQuestIdx].correctOptIndex === optIdx) {
        if (gCurrQuestIdx === gQuests.length - 1) {
            var elBoard = document.querySelector('.board');
            var rightAnswerCount = gQuests.length - gMistakeCount;
            var Congratulations = '';
            switch (rightAnswerCount) {
                case 0:
                case 1:
                case 2:
                    Congratulations = 'אתה חייב לשבת ללמוד, המצב קשה';
                    break;
                case 3:
                case 4:
                    Congratulations = 'יש מקום לשיפור';
                    break;
                case 5:
                case 6:
                    Congratulations = '!כל הכבוד רואים שלמדת';
                    break;
            }
            var strHtml = `<p>ענית נכון על ${rightAnswerCount} מתוך ${gQuests.length} שאלות</p>
                <p>${Congratulations}</p>
                <button class="answer" onclick="refresh()">משחק חוזר</button>`;
            elBoard.innerHTML = strHtml;
        } else {

            gCurrQuestIdx++;
            createQuests();
        }
    } else {

        if (elBtn.classList.contains('mistake')) return;
        elBtn.classList.add('mistake');
        gMistakeCount++;
    }
}
/*
3. If the player is correct, move on to next quest
4. After last question – show a 'Victorious' msg to the user and a
restart button*/