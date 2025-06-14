FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and config
COPY .mvn .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy source
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Copy JAR to run
COPY target/*.jar app.jar

# Run the application
CMD ["java", "-jar", "app.jar"]
