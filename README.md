# 餐廳清單 (restaurant list)
此專案提供了八家推薦餐廳的清單以及評分、分類等等詳細資訊，並且有提供搜尋功能。
## 功能列表
- 依餐廳名稱搜尋
- 餐廳清單的新增、編輯和刪除功能
- 餐廳詳細資訊包含類別、地址、電話、評分、圖片及 Google Map
  - 點選地址旁的圖示可透過 Google Map查看位置詳細資料
- 此用信箱註冊及登入功能
- 可使用 Facebook 帳號登入
## 環境建置與需求 (prerequisites)
#### 環境
- Node.js 10.15.3

#### 套件
- bcryptjs: "^2.4.3",
- body-parser: "^1.19.0",
- connect-flash: "^0.1.1",
- dotenv: "^8.2.0",
- express: "^4.17.1",
- express-handlebars: "^5.2.0",
- express-session: "^1.17.1",
- method-override: "^3.0.0",
- mongoose: "^5.11.13",
- passport: "^0.4.1",
- passport-facebook: "^3.0.0",
- passport-local: "^1.0.0"

## 安裝與執行 (installation and execution)
1. 使用 git 下載本專案
```
git clone https://github.com/asdfg44l/Restaurant-CRUD.git
```
2. 移動至本專案資料夾
```
cd Restaurant-CRUD
```
3. 安裝套件
```
npm install
```
4. 使用種子資料
```
npm run seed
```