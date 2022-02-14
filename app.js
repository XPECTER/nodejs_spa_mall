const express = require("express"); // 패키지의 파일을 불러온다.
const connect = require("./schemas/index");
const app = express();
const port = 3000;

connect();

const goodsRouter = require("./routes/goods");

// 코드 순서가 중요하다. use를 쓰고 get을 써야 get이 use의 영향을 받는다.
// app.use((req, res, next) => {
//     console.log("미들웨어가 구현됐습니까?");
//     // next();
//     // res.send("미들웨어의 응답입니다.");
//     console.log("주소는?", req.path);
//     if (req.path === "/test") {
//         res.send("테스트 주소로 오셨네요.");
//     } else {
//         next();
//     }
// });

// const cartsRouter = require("./routes/carts");

const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
};

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleware);

// app.use("/api", [goodsRouter, cartsRouter]);
app.use("/api", [goodsRouter]);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌습니다.");
});
