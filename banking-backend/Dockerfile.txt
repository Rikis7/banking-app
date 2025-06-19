# ----------- Stage 1: Build JAR -----------
FROM openjdk:21-jdk-slim AS build

WORKDIR /app

COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline

COPY src ./src
RUN ./mvnw package -DskipTests

# ----------- Stage 2: Run JAR -------------
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy only the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
