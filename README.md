## 식단 조회 웹 애플리케이션

이 프로젝트는 Node.js와 Express를 사용하여 학교 급식 정보를 조회하는 웹 애플리케이션입니다. 사용자는 특정 날짜를 선택하여 해당 날짜의 조식, 중식, 석식 메뉴를 확인할 수 있습니다.

### 기능

1. **날짜 선택 기능**: 사용자는 홈페이지에서 특정 날짜를 선택하여 해당 날짜의 급식을 조회할 수 있습니다.
2. **급식 조회**: 선택한 날짜의 급식 정보를 NEIS(교육통합정보시스템) API를 통해 조회합니다.
3. **미제공 항목 처리**: NEIS API에서 급식 정보가 제공되지 않는 경우, "미제공"으로 표시하여 사용자에게 알려줍니다.

### 사용 기술

- Node.js: JavaScript 런타임 환경으로 서버 사이드 로직을 구현하기 위해 사용되었습니다.
- Express.js: Node.js 웹 애플리케이션 프레임워크로, 서버와 라우팅을 구현하는 데 사용되었습니다.
- Axios: HTTP 클라이언트 라이브러리로, 외부 API로의 HTTP 요청을 처리하기 위해 사용되었습니다.
- Request: HTTP 요청을 보내기 위한 Node.js 모듈로, NEIS API와의 통신에 사용되었습니다.
- CSV 파싱: fs 및 csv-parser 모듈을 사용하여 CSV 파일에서 학교 정보를 읽어왔습니다.
- 뷰 엔진: EJS 뷰 엔진을 사용하여 서버 측에서 동적으로 HTML을 렌더링하였습니다.

### 코드 구성

- 서버 구성: Express를 사용하여 서버를 설정하고, 요청을 처리하는 코드가 구현되어 있습니다.
- 날짜 형식 변환: 날짜 형식을 변환하는 formatDate 함수가 정의되어 있습니다.
- CSV 파일 읽기: CSV 파일에서 학교 정보를 읽어오는 readCSV 함수가 정의되어 있습니다.
- 급식 조회: NEIS API를 통해 급식 정보를 조회하고, 결과를 사용자에게 제공하는 코드가 구현되어 있습니다.
- 미제공 항목 처리: 급식 정보가 없는 경우를 처리하는 CheckValue 함수가 정의되어 있습니다.

### 사용 방법

1. 프로젝트를 클론합니다.
2. 필요한 라이브러리를 설치합니다: `npm install express axios request`.
3. 서버를 실행합니다: `node index.js`.
4. 웹 브라우저에서 `http://localhost:8000`에 접속하여 웹 애플리케이션을 사용합니다.

### 참고 사항

- NEIS API를 사용하기 위해서는 API 키가 필요합니다. API 키를 발급받고 코드에 적절히 적용해야 합니다.
- 프로젝트에 사용된 CSV 파일은 학교 정보를 담고 있으며, 필요에 따라 수정할 수 있습니다.

이 프로젝트는 학교 급식 정보 조회를 위한 간단한 예제로, 기본적인 Express 및 API 요청 처리에 대한 이해를 높일 수 있는데 도움이 될 것입니다.
