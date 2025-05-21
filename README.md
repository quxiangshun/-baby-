# Nuxt Minimal Starter

```shell
yarn add @pinia/nuxt --dev
```

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# 部署
- 安装node（`apt install nodejs`）
- 安装npm（`apt install npm`）
- 安装pm2（`npm i pm2 -g`）
- 在`.output`文件夹中新增`ecosystem.config.js`
```js
// ecosystem.config.js
// 运行生产环境
module.exports = {
    apps: [
      {
        name: 'lbey',
        script: './server/index.mjs',
        env:{
            NODE_ENV:'production',
            PORT:'9089'//端口 访问：http://localhost:9089/
         }
      }
    ]
  }
```
- 控制台运行`pm2 start ecosystem.config.js`启动服务
- 修改nginx配置反向代理
```conf
server {
    listen 80; # 监听80端口
    server_name yourdomain.com; # 你的域名或IP地址
 
    location / {
        proxy_pass http://localhost:9089; # 代理到本地8080端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
- 重启nginx`systemctl restart nginx`