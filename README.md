# Mô tả

Source code backend của ketnoiviec.net

# Cài đặt

### 1. Yêu cầu hệ thống

- NodeJS >= 12
- MongoDB >= 3

### 2. Cấu hình

#### File môi trường ```.env```

Sao chép và tạo mới file ```.env``` từ file ```.env.example```

```shell
cp .env.example .env
```
Variables trong ```.env```

- ```APP_SUPER_USER```: Email danh sách các admin, ngăn cách bởi dấu ```,```. Ví dụ: "khanhnq@ketnoiviec.net,support@ketnoiviec.net"
- ```APP_ENV```: ```development``` | ```production``` môi trường hoạt động của project
- ```APP_DEBUG```: ```true``` | ```false``` Bật/Tắt Debug trên console
- ```APP_LOG```: ```mattermost``` : Log message về mattermost
- ```LOG_WEBHOOK```: Webhook mattermost log bug
- ```ACTIVITY_WEBHOOK```: Webhook mattermost log hoạt động trên website
- ```APP_PORT```: PORT chạy project
- ```API_URL```: URL site project backend. Trên production: ```graph.ketnoiviec.net```
- ```SITE_URL```: URL site project frontend. Trên production: ```ketnoiviec.net```
- ```STUDIO_URL```: URL site project frontend nhà tuyển dụng. Trên production: ```employer.ketnoiviec.net```
- ```ADMIN_URL```: URL site project admin. Trên production: ```internal.ketnoiviec.net```
- ```MAIL_API_URL```: ```https://mail-marketing.ketnoiviec.net``` URL site quản lý email. API Mail
- ```LOCAL_SITE```: URL site project frontend ketnoiviec.net local. Dùng để allow cors local có thể connect được với backend production
- ```LOCAL_STUDIO```: URL site project frontend employer.ketnoiviec.net local. Dùng để allow cors local có thể connect được với backend production
- ```LOCAL_ADMIN```: URL site project frontend internal.ketnoiviec.net local. Dùng để allow cors local có thể connect được với backend production

- ```CRAWL_IMPORT_TOKEN```: token để import dữ liệu từ server crawl về site chính

- ```COOKIE_AGE```: Thời hạn cookie. miliseconds
- ```COOKIE_KEY```: Key của cookie
- ```COOKIE_SHARE_DOMAIN```: Share cookie giữa các subdomain từ domain chính.

- ```USER_JWT_SECRET```: JWT secret key sử dụng auth user. Cookie ```user_accessToken```
- ```USER_EXPIRES_ACCESS_TOKEN```: Thời hạn auth user. miliseconds
- ```USER_EXPIRES_REFRESH_TOKEN```: Thời hạn refresh token

- ```EMPLOYER_JWT_SECRET```: JWT secret key sử dụng auth employer. Cookie ```employer_accessToken```
- ```EMPLOYER_EXPIRES_ACCESS_TOKEN```: Thời hạn auth employer. miliseconds
- ```EMPLOYER_EXPIRES_REFRESH_TOKEN```: Thời hạn refresh token

- ```DB_CONNECTION```: ```mongodb```
- ```DB_HOST```
- ```DB_PORT```
- ```DB_DATABASE```
- ```DB_USERNAME```
- ```DB_PASSWORD```

- ```AWS_ID```: ID của aws
- ```AWS_SECRET```: Secret Key AWS

- ```S3_BUCKET_NAME```
- ```S3_FILE_PERMISSION```
- ```S3_REGION```: ```ap-southeast-2```
- ```S3_API_VERSION```: ```2010-12-01```

- ```ZALO_APP_ID```: Zalo Auth. Đã disable
- ```ZALO_APP_KEY```: Zalo Auth.

- ```FACEBOOK_APP_ID```: Auth Facebook
- ```FACEBOOK_APP_SECRET```: Auth Facebook

- ```GOOGLE_CLIENT_ID```: Auth Google
- ```GOOGLE_CLIENT_SECRET```: Auth Google

- ```MAIL_API_KEY```: API Key mail-marketing.ketnoiviec.net

#### Tải về ```node_modules```
```shell
npm install
```
hoặc

```shell
yarn install
```

###3. Khởi chạy

#### Môi trường ```development```
Chạy đồng thời watch Typescript compile và nodemon cho server

Watch Typescript compile

```shell
yarn ts
```

Watch Node server
```shell
yarn server
```

#### Môi trường server

Build ```dist```
```shell
yarn build
```
Start server
```shell
yarn start
```

#### PM2 ```app.config.json```
```json
{
  apps : [
    {
      name      : "graph-server",
      script    : "npx",
      interpreter: "none",
      args: "npm run server"
    }
  ]
}
```


