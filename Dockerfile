 FROM node:20-alpine AS frontend-build

 WORKDIR /app/frontend
 COPY frontend/package.json frontend/package-lock.json ./
 RUN npm install --frozen-lockfile
 COPY frontend ./
 RUN npm run build
 
 FROM amazoncorretto:17-alpine AS backend-build

 WORKDIR /app/backend
 COPY backend ./
 RUN chmod +x mvnw
 RUN ./mvnw clean package -DskipTests
 
 FROM amazoncorretto:17-alpine

 WORKDIR /app
 RUN apk add --no-cache tini
 
 COPY --from=frontend-build /app/frontend/.next /frontend/.next
 COPY --from=frontend-build /app/frontend/public /frontend/public
 COPY --from=frontend-build /app/frontend/package.json /frontend/package.json
 
 COPY --from=backend-build /app/backend/target/*.jar backend.jar
 
 EXPOSE 3000 8080
 
 ENTRYPOINT ["/sbin/tini", "--"]
 
 CMD sh -c "java -jar backend.jar & sleep 10 && cd /frontend && npm run start"
 