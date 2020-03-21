const path = require('path')
const fs = require('fs')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken');

server.use(jsonServer.bodyParser);
server.use(middlewares)


// 獲取 user json
const getUserDb = () => {
    const users = fs.readFileSync(path.join(__dirname, 'users.json'), 'UTF-8');
    return JSON.parse(users)
}


// 驗證權限
const isAuthenticated = ({email, password}) => {
    const userData = getUserDb();
    const isHasUser = userData.users.findIndex((user) => {
        return user.email === email && user.password === password
    })

    return isHasUser !== -1;
}

// 創建 jwtToken
const createToken = payload => {
    return jwt.sign(payload, 'jessicadin', { expiresIn: '1h' });
}

// 登入
server.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (isAuthenticated({email, password})) {

        const user = getUserDb().users.find(item => {
            if (item.email === email && item.password === password) {
                return item;
            }
        })

        const payload = {
            nickname: user.nickname,
            email: user.email,
            type: user.type
        }

        // 創建jwt
        const jwtToken = createToken(payload);
        res.status(200).json(jwtToken);

    } else {
        const status = 401;
        const message = "EMAIL 或 PASSWORD 不正確!!!!"
        res.status(status).json({ status, message });
    }
})

// 註冊
server.post('/auth/register', (req, res) => {

    const { email, password, nickname, type } = req.body;

    // 判斷是否註冊過
    if (isAuthenticated(email, password)) {
        const state = 401;
        const message = "帳號密碼已經存在!";
        res.status(state).json({ state, message });
    }

    // 沒註冊過走這
    fs.readFile(path.join(__dirname, 'users.json'), (err, _data) => {
        if (err) {
            const state = 401;
            const message = err;
            return res.status(state).json({ state, message });
        }
      
        const data = JSON.parse(_data.toString());
 
        const last_item_id = data.users[data.users.length - 1].id;
      
        data.users.push({ id: last_item_id + 1, email, password, nickname, type:parseInt(type) }); //add some data

        // 把資料寫回user.json
        fs.writeFile(
            path.join(__dirname, 'users.json'),
            JSON.stringify(data),(err, result) => {
                if (err) {
                    const state = 401;
                    const message = err;
                    res.status(state).json({ state, message });
                    return;
                }
            }
        );
    });
    return res.status(200).json({ state:200, message:"註冊成功!" });
})
  

server.use(router)
server.listen(process.env.PORT || 3003, () => {
    console.log('JSON Server is running')
})