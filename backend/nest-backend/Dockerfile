FROM node:18.18.2

WORKDIR /app 

COPY package.json ./
COPY . .

# Corepack을 설치하고 활성화
RUN npm install -g corepack && corepack enable
# Yarn 설치 및 버전 Berry로 설정
RUN yarn -v && yarn set version berry
RUN yarn install

EXPOSE 3000

# 애플리케이션 시작
CMD ["yarn", "start"]