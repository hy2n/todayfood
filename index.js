// express 인스턴스 생성 및 app에 저장
const express = require("express");
const app = express();
const axios = require('axios');

// 8000번 포트로 지정
const port = 8000;

// 화면 엔진은 ejs로 설정한다.
app.set("view engine", "ejs");

// Express에서 정적파일 제공
app.use('/static', express.static('static'));

// test.ejs 실행
app.get("/", (req, res) => {
    let today = new Date(); 
    res.render("food",{
        name:'Current Time : ' + today
    });
})

// 지정된 포트로 로컬서버 열기
app.listen(port, () => {
    console.log("SERVER started : ", port);
})