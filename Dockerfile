# 1. 빌더 이미지 설정
FROM eclipse-temurin:23-jdk AS builder
WORKDIR /app

# 2. Gradle 파일 및 소스 코드 복사
COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle settings.gradle ./
COPY src ./src

# 3. 권한 설정 및 JAR 빌드
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

# 4. 실제 실행 이미지 설정
FROM eclipse-temurin:23-jre
WORKDIR /app
EXPOSE 8080

# 5. 빌더 이미지에서 생성된 JAR 파일 복사
COPY --from=builder /app/build/libs/*.jar app.jar

# 6. 애플리케이션 실행 명령
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
