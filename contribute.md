## Guidlines
 - Please Maintain Proper Formatting And prefer const over let

## Manual Installation
 - Install NodeJs
 - Clone the Repo
 - Install Dependecies (npm install)
 - start the db
  - docker run -e POSTGRES_PASSWORD=password -e POSTGRES_DB=my_db -e POSTGRES_USER=marcella -p 5432:5432 postgres
  - go to neon.tech get yourself a db
 - install maven
 - maven clean install inside backend folder
 - npm run build inside frontend folder
 - npm run start in frontend folder

## Docker Installation
 - install docker
 - Create a Network - `docker network create user_project`
 - Start Postgres
  - `docker run -d --network user_project -e POSTGRES_PASSWORD=password -e POSTGRES_DB=my_db -e POSTGRES_USER=marcella --name somu_db -p 5432:5432 postgres `
 - Build the project - `docker build -t user_project .`
 - start the image - `docker run --network=user_project -p 3000:3000 -p 8080:8080 user_project`

## Docker Compose Installation
 - install docker,docker-compose
 - Run `docker-compose up`