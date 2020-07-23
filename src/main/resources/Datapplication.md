server:
  port: 80
spring:
  datasource:
    url: jdbc:postgresql://${P3_URL}/rev_overflow
    username: ${P3_ADMIN}
    password: ${P3_PASS}
    driver-class-name: org.postgresql.Driver
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQL95Dialect
    show-sql: true
    hibernate:
      ddl-auto: update
environments:
  rss: "http://ec2-34-203-75-254.compute-1.amazonaws.com:10001"