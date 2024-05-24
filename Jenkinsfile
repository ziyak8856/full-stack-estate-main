pipeline {
    agent any
    tools{
        nodejs "Node22"
    }
     environment {
        SCANNER_H= tool 'sonar-scanner'
        DOCKER_USERNAME = 'ziyak8856532'
        DOCKER_PASSWORD = 'Jiyak8856'
    }
    stages {
        stage('Git Checkout') {
            steps {
                git 'https://github.com/ziyak8856/full-stack-estate-main.git'
            }
        }
    
    
        stage('Install Backend Dependencies') {
            steps {
                dir('api') {
                    script {
                        sh 'npm install'
                        sh 'npm install -g nodemon'
                    }
                }
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    script {
                        sh 'npm install'
                    }
                }
            }
        }
    stage('Test') {
            steps {
                dir('api') {
                    script {
                        sh 'npm test'
                    }
                }
            }
        }
    stage('Trivy_FS_scan_Client') {
        steps {
            dir('client') {
                sh "trivy fs --format table -o client-fs-report.html ."
            }
        }
    }
    stage('Trivy_FS_scan_API') {
        steps {
            dir('api') {
                sh "trivy fs --format table -o api-fs-report.html ."
            }
        }
    }
    stage('Sonarqube') {
        steps {
             withSonarQubeEnv('sonar') {
          sh "$SCANNER_H/bin/sonar-scanner -Dsonar.projectKey=projEstate -Dsonar.projectName=projEstate"
        }
            
        }
    }
   
     stage('Docker build, tag, and push') {
            steps {
                script {
                    // Docker credentials
                    def DOCKER_USERNAME = 'ziyak8856532'
                    def DOCKER_PASSWORD = 'Jiyak8856'

                    // Authenticate with Docker registry
                    sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin https://index.docker.io/v1/"

                    // Build, tag, and push backend image
                    sh "docker build -t ${DOCKER_USERNAME}/api:latest ./api"
                    sh "docker push ${DOCKER_USERNAME}/api:latest"

                    // Build, tag, and push frontend image
                    sh "docker build -t ${DOCKER_USERNAME}/client:latest ./client"
                    sh "docker push ${DOCKER_USERNAME}/client:latest"
                }
            }
        }
           stage('Deploy') {
            steps {
                script {
                    sh 'ansible-playbook -i inventory.ini playbook.yml'
                }
            }
        }


           
        
  }
}
