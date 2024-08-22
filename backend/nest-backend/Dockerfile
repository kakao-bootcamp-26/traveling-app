# 1단계: Build environment
FROM node:18 AS build

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 루트 디렉토리의 모든 파일을 복사합니다.
COPY . .

# Yarn Berry를 사용할 수 있도록 corepack을 활성화합니다.
RUN corepack enable

# Yarn 버전을 Berry로 설정합니다.
RUN yarn set version berry

# 의존성 설치 (루트 디렉토리)
RUN yarn install || { echo "yarn install failed"; exit 1; }

# 백엔드 디렉토리로 이동하여 빌드
WORKDIR /app/backend/nest-backend

# 빌드
RUN yarn build || { echo "yarn build failed"; exit 1; }

# 2단계: Production environment
FROM node:18

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 빌드된 파일을 복사합니다.
COPY --from=build /app .

# 환경 변수 설정 (Nest.js가 설치된 경로 추가)
ENV PATH /app/node_modules/.bin:$PATH

# 최종 프로덕션 환경에서 의존성 재설치 (optional, 필요한 경우만)
RUN yarn install --production || { echo "Final yarn install failed"; exit 1; }

WORKDIR /app/backend/nest-backend

RUN yarn install

# 애플리케이션이 사용하는 포트를 노출합니다.
EXPOSE 3000

# Nest.js 애플리케이션을 시작합니다.
CMD ["yarn", "start"]
