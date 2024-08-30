provider "aws" {
  region = var.aws_region
}
# Ubuntu AMI 검색
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]  # Canonical의 Ubuntu AMI
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# VPC 생성
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr

  tags = {
    Name = "main-vpc"
  }
}

# 퍼블릭 서브넷 생성
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidr
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet"
  }
}

# 프라이빗 서브넷 생성
resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = var.private_subnet_cidr

  tags = {
    Name = "private-subnet"
  }
}

# 인터넷 게이트웨이 생성
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}

# 퍼블릭 라우팅 테이블 생성
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "public-route-table"
  }
}

# 라우팅 테이블을 퍼블릭 서브넷에 연결
resource "aws_route_table_association" "public_association" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# NAT 게이트웨이 생성 (프라이빗 서브넷을 위한)
resource "aws_eip" "nat_eip" {
  domain = "vpc"
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public.id
}

# 프라이빗 라우팅 테이블 생성
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "private-route-table"
  }
}

# 라우팅 테이블을 프라이빗 서브넷에 연결
resource "aws_route_table_association" "private_association" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private.id
}

# 보안 그룹 생성 (프론트엔드용)
resource "aws_security_group" "frontend_sg" {
  vpc_id = aws_vpc.main.id

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "Allow Front"
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
    ingress {
    description = "Allow Jenkins"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "frontend-sg"
  }
}

# 프론트엔드 EC2 인스턴스 생성
resource "aws_instance" "frontend" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.frontend_sg.id]
  key_name                    = var.key_name  # SSH 접속을 위한 키 페어
  #공간이 부족해서 설치 안되는 패키지가 있는 것 같아서.
  root_block_device {
    volume_size = 50  # 루트 EBS 볼륨 크기를 50GB로 설정
  }

  user_data = <<-EOF
              #!/bin/bash
              exec > /var/log/user_data.log 2>&1
              set -x

              sudo apt-get update -y
              sudo apt-get upgrade -y

              # Docker 설치
              sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
              sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              sudo apt-get update -y
              sudo apt-get install -y docker-ce

              # Jdk 설치
              sudo apt-get install -y openjdk-11-jdk

              # Jenkins 설치
              curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
              echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
              sudo apt-get update -y
              sudo apt-get install -y jenkins || { echo 'Jenkins 설치 실패' ; exit 1; }
              sudo systemctl start jenkins || { echo 'Jenkins 시작 실패' ; exit 1; }
              sudo systemctl enable jenkins

              # Jenkins와 Docker 권한 설정
              sudo usermod -aG docker jenkins
              sudo systemctl restart jenkins

              # 깃허브 클론 테스트
              #sudo mkdir /app
              #sudo chown ubuntu:ubuntu /app
              #cd /app
              #sudo git clone --branch "feat/docker&jenkins&gitWebHook" https://github.com/kakao-bootcamp-26/traveling-app.git || { echo 'Git 클론 실패' ; exit 1; }
              
              #sudo chown -R jenkins:jenkins /app/traveling-app
              #sudo chmod -R 775 /app/traveling-app
              #sudo systemctl restart jenkins
              
              echo "user_data 스크립트 완료"
              EOF

  tags = {
    Name = "frontend-react"
  }
}

# 백엔드 보안 그룹 생성
resource "aws_security_group" "backend_sg" {
  vpc_id = aws_vpc.main.id

  ingress {
    description = "Allow HTTP"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.public.cidr_block]
  }

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "backend-sg"
  }
}

# 백엔드 EC2 인스턴스 생성
resource "aws_instance" "backend" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.private.id
  vpc_security_group_ids      = [aws_security_group.backend_sg.id]
  key_name                    = var.key_name  # SSH 접속을 위한 키 페어

  # Docker 및 Jenkins 설치 및 설정
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get upgrade -y
              
              # Docker 설치
              sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
              sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              sudo apt-get update -y
              sudo apt-get install -y docker-ce
              # Jdk 설치
              sudo apt-get install -y openjdk-11-jdk

              # Jenkins 설치
              curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
              echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
              sudo apt-get update -y
              sudo apt-get install -y jenkins || { echo 'Jenkins 설치 실패' ; exit 1; }
              sudo systemctl start jenkins || { echo 'Jenkins 시작 실패' ; exit 1; }
              sudo systemctl enable jenkins

              # Jenkins와 Docker 권한 설정
              sudo usermod -aG docker jenkins
              sudo systemctl restart jenkins
              #깃허브 클론 테스트
              sudo mkdir /app
              sudo chown ubuntu:ubuntu /app
              cd /app
              sudo git clone --branch "feat/docker&jenkins&gitWebHook" https://github.com/kakao-bootcamp-26/traveling-app.git              # 백엔드 Docker 컨테이너 실행
              # (여기에서 도커 이미지 빌드 및 실행)
              EOF

  tags = {
    Name = "backend-nestjs"
  }
}

# 데이터베이스 보안 그룹 생성 (EC2용)
resource "aws_security_group" "db_sg" {
  vpc_id = aws_vpc.main.id

  ingress {
    description = "Allow from backend"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.private.cidr_block] # 백엔드 서브넷에서만 접근 가능
  }

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # SSH 접근을 위해 설정 (필요시 제한 가능)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "db-sg"
  }
}

# 데이터베이스 EC2 인스턴스 생성 (PostgreSQL을 Docker로 배포)
resource "aws_instance" "db" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.private.id
  vpc_security_group_ids      = [aws_security_group.db_sg.id]
  key_name                    = var.key_name  # SSH 접속을 위한 키 페어

  # Docker 및 Jenkins 설치 및 PostgreSQL Docker 컨테이너 실행
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get upgrade -y
              
              # Docker 설치
              sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
              sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              sudo apt-get update -y
              sudo apt-get install -y docker-ce

              # Jdk 설치
              sudo apt-get install -y openjdk-11-jdk

              # Jenkins 설치
              curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
              echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
              sudo apt-get update -y
              sudo apt-get install -y jenkins || { echo 'Jenkins 설치 실패' ; exit 1; }
              sudo systemctl start jenkins || { echo 'Jenkins 시작 실패' ; exit 1; }
              sudo systemctl enable jenkins


              # Jenkins와 Docker 권한 설정
              sudo usermod -aG docker jenkins
              sudo systemctl restart jenkins

              # PostgreSQL을 Docker 컨테이너로 실행
              sudo docker pull postgres:latest
              sudo docker run --name goatravelDB -e POSTGRES_USER=ktb26 -e POSTGRES_PASSWORD=ktbteam26 -e POSTGRES_DB=goatravel -p 5432:5432 -d postgres

              #깃 클론 테스트
              sudo mkdir /app
              sudo chown ubuntu:ubuntu /app
              cd /app
              sudo git clone --branch "feat/docker&jenkins&gitWebHook" https://github.com/kakao-bootcamp-26/traveling-app.git          EOF
              EOF
  tags = {
    Name = "db-postgresql"
  }
}

# AI 보안 그룹 생성
resource "aws_security_group" "ai_sg" {
  vpc_id = aws_vpc.main.id

  ingress {
    description = "For Jenkins"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.private.cidr_block] # 백엔드 서브넷에서만 접근 가능
  }

  ingress {
    description = "Allow HTTP"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.private.cidr_block] # 백엔드 서브넷에서만 접근 가능
  }

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ai-sg"
  }
}

# AI EC2 인스턴스 생성
resource "aws_instance" "ai" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.private.id
  vpc_security_group_ids = [aws_security_group.ai_sg.id]
  key_name = var.key_name  # SSH 접속을 위한 키 페어

  # Docker 및 Jenkins 설치 및 설정
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get upgrade -y

              # Docker 설치
              sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
              sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              sudo apt-get update -y
              sudo apt-get install -y docker-ce

              # Jdk 설치
              sudo apt-get install -y openjdk-11-jdk

              # Jenkins 설치
              curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
              echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
              sudo apt-get update -y
              sudo apt-get install -y jenkins || { echo 'Jenkins 설치 실패' ; exit 1; }
              sudo systemctl start jenkins || { echo 'Jenkins 시작 실패' ; exit 1; }
              sudo systemctl enable jenkins

              # Jenkins와 Docker 권한 설정
              sudo usermod -aG docker jenkins
              sudo systemctl restart jenkins

              # 깃허브 클론
              sudo mkdir /app
              sudo chown ubuntu:ubuntu /app
              cd /app
              sudo git clone https://github.com/kakao-bootcamp-26/chatbot.git || { echo 'Git 클론 실패' ; exit 1; }

              # AI 컨테이너 실행 예시 (Dockerfile 필요)
              cd /app/chatbot
              sudo docker build -t ai-app .
              sudo docker run -p 5000:5000 ai-app
              EOF

  tags = {
    Name = "ai-instance"
  }
}

