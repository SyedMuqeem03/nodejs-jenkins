pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "syedmuqeem03/nodejs-jenkins"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/SyedMuqeem03/nodejs-jenkins'
            }
        }

        stage('Install Dependencies') {
            steps {
                docker.image('node:latest').inside {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                docker.image('node:latest').inside {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD Pipeline Successful"
        }
        failure {
            echo "❌ CI/CD Pipeline Failed"
        }
    }
}

