async function fetchJSONData() {
    const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjkBL-b-o1HHQRaPVgFmh2hazEGdhM1xsNBjGZm8Mo8AFFneLJj9eRbZutnCJcpm3WuAtegmV0XMRGODViAaIaFPkcEBn6zmnGdOtaSqSUsMYbVfNtma2Fm86_AQVyDqgs-sFAc5mAb8-aRP-RBy8TmfiehOenfN7O7DU9jOZ4NuQ51Aew2_IuXvTgUh1L6EYS4r4pMC9A7Z6WE9xIcyLrqHLFnAUipV6iI5L2XP2RXhAqzdKf1DWbbGNb527dBNiGAL8mlcFucQWsa43BR0A5mMRIujwSeq5KUuagj&lib=MWJHYyCdk9uZe3rmtRHV_FYD_GDqAveGp';
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        clearTable();
        generateTableHeader(jsonData);
        generateTableBody(jsonData);
    } catch (error) {
        console.error('データの取得に失敗しました:', error);
    }
}

function clearTable() {
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.getElementById('tableBody');
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';
}

function generateTableHeader(jsonData) {
    const tableHeader = document.getElementById('tableHeader');
    const headers = Object.keys(jsonData[0]);
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeader.appendChild(th);
    });
}

function generateTableBody(jsonData) {
    const tableBody = document.getElementById('tableBody');
    jsonData.forEach(item => {
        const tr = document.createElement('tr');

        if (item['種別'] === '各駅停車') {
            tr.style.backgroundColor = '#3399FF';
        }else if (item['種別'] === '急行') {
            tr.style.backgroundColor = '#FF3366';
        }else if (item['種別'] === '通急') {
            tr.style.backgroundColor = '#FF99FF';
        }else{
            tr.style.backgroundColor = '#CCCCFF';
        }

        if (item['有効・無効'] && item['有効・無効'].trim() !== '') {
            tr.style.backgroundColor = '#F8B400';
        }
        
        Object.keys(item).forEach(key => {
            const td = document.createElement('td');

            if (key === '有効・無効' && item[key].trim() !== '') {
                td.textContent = 'この列車は運休です。';
            } else if (key === '有効・無効' && item[key].trim() === '') {
                Object.keys(item).forEach(key2 => {
                    if (key2 === '列番' && item[key2].trim() !== ''){
                        td.textContent = '通常通り運行予定です。';
                    }
                });
            } else {
                td.textContent = item[key];
            }

            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

fetchJSONData();