// express 인스턴스 생성 및 app에 저장
const express = require("express");
const app = express();
const axios = require('axios');
const request = require('request');

const fs = require('fs');
const csv = require('csv-parser');


// 8000번 포트로 지정
const port = 8000;

// 화면 엔진은 ejs로 설정한다.
app.set("view engine", "ejs");

// Express에서 정적파일 제공
app.use('/static', express.static('static'));


// test.ejs 실행
app.get("/", (req, res) => {
    let today = new Date();
    res.render("food", {
        name: 'Current Time : ' + today
    });
})

// 지정된 포트로 로컬서버 열기
app.listen(port, () => {
    console.log("SERVER started : ", port);
})

function readCSV(filename, callback) {
    const results = [];
    fs.createReadStream(filename)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            callback(results);
        })
        .on('error', (err) => {
            console.error("CSV 파일을 읽는 중 오류가 발생했습니다.");
            console.error(err);
            callback(null);
        });
}


app.get("/request/:date", (req, res) => {
    const date = req.params.date;
    if (!(date)) {
        console.log("no date info!");
    }
    readCSV('info.csv', function (data) {
        if (!data) {
            console.log("CSV 파일이 없습니다. 수동으로 설정해주세요.");
            return;
        }

        // CSV 데이터에서 원하는 값을 찾습니다.
        const BCode = data[0].BCode;
        const SchoolCode = data[0].SchoolCode;

        const options = {
            uri: "https://open.neis.go.kr/hub/mealServiceDietInfo",
            qs: {
                ATPT_OFCDC_SC_CODE: BCode,
                SD_SCHUL_CODE: SchoolCode,
                MLSV_YMD: date,
                type: "json"
            }
        };
        request(options, function (err, response, body) {
            if (err) {
                // 오류가 발생하면 클라이언트에게 오류 메시지를 응답으로 보냅니다.
                return res.status(500).send("서버 오류 발생");
            }
            var obj = JSON.parse(body);

            let morning = "";
            let lunch = "";
            let evening = "";

            const mealServiceDietInfo = obj.mealServiceDietInfo;
            if (!mealServiceDietInfo) {
                morning = '미제공';
                lunch = '미제공';
                evening = '미제공';
            }
            else {
                const mealInfo = mealServiceDietInfo[1];

                mealInfo.row.forEach(row => {
                    let cleanedDish = row.DDISH_NM.replace(/\./g, '').replace(/\(\d+\)/g, ''); // '.'과 소괄호 안의 숫자들을 제거합니다.
                    if (row.MMEAL_SC_NM === "조식") {
                        morning = cleanedDish;
                    } else if (row.MMEAL_SC_NM === "중식") {
                        lunch = cleanedDish;
                    } else if (row.MMEAL_SC_NM === "석식") {
                        evening = cleanedDish;
                    }
                });
            }

            // 클라이언트에게 조식, 중식, 석식에 해당하는 요리를 응답으로 보냅니다.

            res.render("food", {
                name: 'Current Time : ' + morning
            });

        });
    });


});
