FROM node:latest as build
COPY ./ /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist/kabor-namarra-blog-cms-capstone-fe/ /usr/share/nginx/html

