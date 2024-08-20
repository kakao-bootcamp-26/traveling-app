# 1단계: Build environment
FROM node:18 AS build

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 프로젝트 전체 파일을 복사합니다.
COPY . .

# Yarn Berry를 사용할 수 있도록 corepack을 활성화합니다.
RUN corepack enable

# Yarn 버전을 Berry로 설정합니다.
RUN yarn set version berry

# 루트 디렉토리에서 전체 의존성 설치
RUN yarn install

# 백엔드 디렉토리로 이동하여 빌드
WORKDIR /app/backend/nest-backend
RUN yarn build

# 2단계: Production environment
FROM node:18

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 빌드된 파일을 복사합니다.
COPY --from=build /app/backend/nest-backend .

# 환경 변수 설정
ENV PATH /app/backend/nest-backend/node_modules/.bin:$PATH

# 애플리케이션이 사용하는 포트를 노출합니다.
EXPOSE 3000

# 애플리케이션을 시작합니다.
CMD ["yarn", "start:prod"]
