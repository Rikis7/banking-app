FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy Maven wrapper and give execution permission
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the source code
COPY src ./src

# Build the app
RUN ./mvnw package -DskipTests

# Run the app
CMD ["java", "-jar", "target/*.jar"]
