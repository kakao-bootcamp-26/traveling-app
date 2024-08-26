pipeline {
    agent any

    environment {
        GIT_CREDENTIALS_ID = 'jenkinstest'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // 레포지토리 클론
                git branch: 'main', url: 'https://github.com/kakao-bootcamp-26/traveling-app.git', credentialsId: GIT_CREDENTIALS_ID
            }
        }

        stage('Build') {
            steps {
                    script {
                        // 도커 컴포즈를 사용하여 빌드 및 배포
                        sh 'docker build --no-cache -t frontend-test -f frontend/react-app/Dockerfile .'
                    }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // 기존 컨테이너 종료 (필요한 경우)
                    sh 'docker stop frontend-container || true && docker rm frontend-container || true'
                    
                    // 새로운 컨테이너 실행
                    sh 'docker run -d -p 5173:5173 --name frontend-container frontend-test'
                }
            }
        }
        
    }
}
