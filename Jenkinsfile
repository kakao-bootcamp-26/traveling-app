pipeline {
    agent any

    environment {
        GIT_CREDENTIALS_ID = 'jenkinstest'
    }

    stages {
        stage('Clone or Update Repository') {
            steps {
                script {
                    // 레포지토리가 이미 클론되어 있는지 확인
                    if (fileExists('traveling-app')) {
                        dir('traveling-app') {
                            // 이미 클론된 레포지토리의 브랜치 변경 및 최신 상태로 업데이트
                            sh 'git fetch origin'
                            sh 'git checkout feat/docker&jenkins&gitWebHook'
                            sh 'git pull origin feat/docker&jenkins&gitWebHook'
                        }
                    } else {
                        // 레포지토리가 없으면 새로 클론
                        sh 'git clone --branch feat/docker&jenkins&gitWebHook https://github.com/kakao-bootcamp-26/traveling-app.git'
                    }
                }
            }
        }

        stage('Copy .env File') {
            steps {
                script {
                    // .env 파일을 복사하여 레포지토리 내의 frontend/react-app/ 디렉토리로 이동
                    sh 'cp /.env ${WORKSPACE}/traveling-app/frontend/react-app/.env'
                }
            }
        }

        stage('Build') {
            steps {
                dir('traveling-app') {
                    script {
                        // 도커 빌드
                        sh 'docker build --no-cache -t frontend-test -f frontend/react-app/Dockerfile .'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // 기존 컨테이너 중지 및 제거
                    sh 'docker stop frontend-test || true'
                    sh 'docker rm frontend-test || true'

                    // 도커 컨테이너 실행
                    sh 'docker run -d --name frontend-test -p 5173:5173 frontend-test'
                }
            }
        }
    }
}

