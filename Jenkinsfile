pipeline {
    agent any

    environment {
        GIT_CREDENTIALS_ID = 'jenkinstest'
    }

    stages {
        stage('Prepare Workspace') {
            steps {
                dir('/app/traveling-app') {
                    script {
                        sh 'pwd'

                        // .env 파일을 백업
                        sh 'cp .env /tmp/.env_backup || true'

                        // 해당 브랜치로 이동하여 최신 변경 사항 가져오기
                        sh 'git fetch origin'
                        sh 'git checkout feat/docker&jenkins&gitWebHook'
                        // 일단은 내 브랜치에만 해놓고 나중에 합치면 main으로 바꾸기
                        sh 'git reset --hard origin/feat/docker&jenkins&gitWebHook'

                        // .env 파일 복원
                        sh 'cp /tmp/.env_backup .env || true'
                    }
                }
            }
        }

        stage('Stop Existing Container') {
            steps {
                script {
                    // 이미 떠 있는 컨테이너 중지 및 삭제
                    sh 'pwd'

                    sh 'docker stop frontend-test || true'
                    sh 'docker rm frontend-test || true'
                }
            }
        }

        stage('Build') {
            steps {
                dir('/app/traveling-app') {
                    script {
                        // 도커 빌드
                        sh 'pwd'

                        sh 'docker build --no-cache -t frontend-test -f frontend/react-app/Dockerfile .'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('/app/traveling-app') {
                    script {
                        sh 'pwd'

                        // 도커 컨테이너 실행
                        sh 'docker run -d --name frontend-test -p 5173:5173 frontend-test'
                    }
                }
            }
        }
    }
}
