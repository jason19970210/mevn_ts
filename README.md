# mevn_ts
Todo List Web Application  
tags: `mongodb` `express` `vue.js v3` `node.js` `typescript`

#### Hackmd Slide
https://hackmd.io/@jason19970210/mevn_ts

### Todo
- [x] CRUD API Entry
- [x] server-side nginx & ufw setup
- [ ] pack with Docker
- [x] filter
- [x] sort
- [ ] `search` with task content
- [ ] swagger `Schema` check
- [ ] server-side input validation
- [ ] server-side format validation
- [ ] server-side unit test with normal payload
- [ ] server-side unit test with abnormal payload
- [ ] functional programming
- [ ] ts-fp pipe
- [ ] swagger tsoa automation


### Config
Check `server/.env.example` for further information  
Create your own `.env` in `server/` folder

### Run
```
## terminal 1
$ cd server
$ npm i && npm run build
$ npm start

## terminal 2
$ cd client
$ npm run dev
```

### Features
- CRUD : Create, Read, Update, Delete
- Filter with `All` & `Done` & `Not Done Yet`
- Sort By `Datetime` & `Prioity`

### API
Check API Doc : http://120.126.18.131:8081/docs/