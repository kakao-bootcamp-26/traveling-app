# 1단계: Build environment
FROM node:18.18.2 AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 yarn.lock 파일을 먼저 복사하여 의존성 설치
COPY package.json yarn.lock ./

# Corepack을 활성화하여 프로젝트가 올바른 Yarn 버전을 사용하도록 합니다.
RUN npm install -g corepack && corepack enable

# Yarn Berry 버전 설정 (프로젝트에 맞는 버전)
RUN yarn set version berry

# 의존성 설치 (모든 워크스페이스 의존성 포함)
RUN yarn install || { echo "yarn install failed"; exit 1; }

# 전체 소스 파일을 복사
COPY . .

# 백엔드 빌드 실행
RUN yarn workspace @blog/backend run build || { echo "Backend build failed"; exit 1; }

# 2단계: Production environment
FROM node:18.18.2

# 작업 디렉토리 설정
WORKDIR /app

# Corepack을 활성화하여 프로젝트가 올바른 Yarn 버전을 사용하도록 합니다.
RUN npm install -g corepack && corepack enable

# 프로덕션용으로 빌드된 파일을 복사
COPY --from=build /app .

# 프로덕션 환경에서 의존성 설치 (프로덕션 의존성만 설치)
RUN yarn workspaces focus --production || { echo "Final yarn install failed"; exit 1; }

# 애플리케이션이 사용하는 포트를 노출
EXPOSE 3000

# 애플리케이션 시작
CMD ["yarn", "workspace", "@blog/backend", "run", "start"]
