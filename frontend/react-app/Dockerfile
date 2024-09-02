# 1단계: Build environment
FROM node:20 AS build

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 루트 디렉토리의 모든 파일을 복사합니다.
COPY . .

# Yarn Berry를 사용할 수 있도록 corepack을 활성화합니다.
RUN corepack enable

# Yarn 버전을 프로젝트에 맞게 설정합니다.
RUN corepack prepare yarn@4.4.1 --activate

# Yarn 버전을 Berry로 설정합니다.
RUN yarn set version berry

# 의존성 설치 (루트 디렉토리)
RUN yarn install || { echo "yarn install failed"; exit 1; }

# Puppeteer 실행에 필요한 라이브러리 설치
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libxkbcommon0 \
    libgbm1 \
    libpango-1.0-0 \
    libasound2 \
    libxshmfence1 \
    libgtk-3-0 \
    libx11-xcb1 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Puppeteer가 사용하는 Chrome 브라우저를 설치합니다.
RUN npx puppeteer browsers install chrome

# 프론트엔드 디렉토리로 이동하여 빌드
WORKDIR /app/frontend/react-app

# 빌드
RUN yarn build || { echo "yarn build failed"; exit 1; }

# 2단계: Production environment
FROM node:20

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# Corepack을 활성화하여 프로젝트가 올바른 Yarn 버전을 사용하도록 합니다.
RUN corepack enable

# Yarn 버전을 프로젝트에 맞게 설정합니다.
RUN corepack prepare yarn@4.4.1 --activate

# 루트 디렉토리의 모든 파일을 복사합니다.
COPY --from=build /app .

# 환경 변수 설정 (Vite가 설치된 경로 추가)
ENV PATH /app/node_modules/.bin:$PATH

# 최종 프로덕션 환경에서 의존성 재설치
RUN yarn install || { echo "Final yarn install failed"; exit 1; }

WORKDIR /app/frontend/react-app

RUN yarn install

# 애플리케이션이 사용하는 포트를 노출합니다.
EXPOSE 5173

# 애플리케이션을 시작합니다.
CMD ["yarn", "workspace", "@blog/frontend", "run", "dev","--host"]
