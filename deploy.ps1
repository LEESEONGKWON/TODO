# 1. 사용 중인 포트 번호를 변수로 설정 (예: 8081 포트)
$PORT = 8081

# 2. 해당 포트에서 실행 중인 프로세스 종료
Write-Host "Stopping processes using port $PORT..."

try {
    # 해당 포트를 사용하는 프로세스를 찾습니다
    $process = Get-NetTCPConnection -LocalPort $PORT -ErrorAction SilentlyContinue

    # 포트를 사용 중인 프로세스가 있다면 종료
    if ($process) {
        $PID = $process.OwningProcess
        Stop-Process -Id $PID -Force -ErrorAction Stop
        Write-Host "Process with PID $PID stopped."
    } else {
        Write-Host "No process found using port $PORT."
    }
} catch {
    Write-Host "Error occurred while stopping process: $_"
}

# 3. 최신 JAR 파일 빌드 (Gradle 사용)
Write-Host "Building the latest JAR file..."
./gradlew clean bootJar

# 4. 새로운 JAR 파일 실행
Write-Host "Running the new JAR file..."
Start-Process java -ArgumentList "-jar", "build/libs/my-app.jar"

Write-Host "Deployment completed successfully!"
