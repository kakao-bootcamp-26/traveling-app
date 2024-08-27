pipeline {
    agent any

    environment {
        GIT_CREDENTIALS_ID = 'jenkinstest'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Jenkins 기본 작업 공간에 GitHub 레포지토리 클론
                    sh 'git clone https://github.com/kakao-bootcamp-26/traveling-app.git || (cd traveling-app && git pull origin feat/docker&jenkins&gitWebHook)'
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
