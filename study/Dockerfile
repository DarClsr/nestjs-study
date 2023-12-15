FROM node:16

WORKDIR /app


COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "node", "./dist/main.js" ]


# 基于 node 18 的镜像。

# 指定当前目录为容器内的 /app。

# 把 package.json 复制到容器里，设置淘宝的 npm registry，执行 npm install。

# 之后把其余的文件复制过去，执行 npm run build。

# 指定暴露的端口为 3000，容器跑起来以后执行 node ./dist/main.js 命令。

# 然后执行 docker build -t nest:first . 镜像名为 nest、标签为 first，构建上下文是当前目录
