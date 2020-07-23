FROM openjdk:8-jdk-alpine

ARG JAR_FILE=target/*.jar

# Add Maven dependencies (not shaded into the artifact; Docker-cached)
# Add the service itself
ARG JAR_FILE
ADD target/${JAR_FILE} /usr/share/myservice/myservice.jar

ENTRYPOINT ["/usr/bin/java", "-jar", "/usr/share/myservice/myservice.jar"]
