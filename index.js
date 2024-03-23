// express 인스턴스 생성 및 app에 저장
const express = require("express");
const app = express();
const axios = require('axios');
const request = require('request');

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

app.get("/request", (req, res) => {
    var nx = '';
    var ny = '';
    const options = {
        uri: "https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=G10&SD_SCHUL_CODE=7430310&MLSV_YMD=202403&type=json",
        qs: {
            gridx: nx,
            gridy: ny
        }
    };
    request(options, function (err, response, body) {
        if (err) {
            // 오류가 발생하면 클라이언트에게 오류 메시지를 응답으로 보냅니다.
            return res.status(500).send("서버 오류 발생");
        }
        var obj = JSON.parse(body);
        console.log(obj);

        // 요청에 대한 응답을 클라이언트에게 보냅니다.
        res.json(obj);
    });
});