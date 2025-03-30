# FROM node:20-alpine AS frontend-build

# WORKDIR /app/frontend
# COPY frontend/package.json frontend/package-lock.json ./

# RUN npm install --frozen-lockfile 
# COPY frontend ./
# RUN npm run build

# FROM amazoncorretto:17-alpine AS backend-build

# WORKDIR /app/backend
# COPY backend ./

# RUN chmod +x mvnw
# RUN ./mvnw clean package -DskipTests

# FROM amazoncorretto:17-alpine

# WORKDIR /app
# RUN apk add --no-cache tini nodejs npm

# COPY --from=frontend-build /app/frontend /frontend

# COPY --from=backend-build /app/backend/target/*.jar backend.jar

# EXPOSE 3000 8080

# ENTRYPOINT ["/sbin/tini", "--"]


# CMD java -jar backend.jar & \
#     sleep 10 && \
#     cd /frontend && \
#     npm run start




# ----------------------------------------
# Frontend Development Stage
# ----------------------------------------
 FROM node:20-alpine AS frontend-dev

 WORKDIR /app/frontend
 COPY frontend/package.json frontend/package-lock.json ./
 RUN npm install --frozen-lockfile 
 
 COPY frontend ./
 
 EXPOSE 3000
 
 CMD ["npm", "run", "dev"]
 
 # ----------------------------------------
 # Backend Development Stage
 # ----------------------------------------
 FROM amazoncorretto:17-alpine AS backend-dev
 
 WORKDIR /app/backend
 COPY backend ./
 
 RUN chmod +x mvnw
 RUN ./mvnw clean package -DskipTests
 
 EXPOSE 8080
 
 CMD ["./mvnw", "spring-boot:run"]
 