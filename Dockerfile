# Utiliza la imagen base Node.js
FROM node:latest

# Define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

EXPOSE 8000

# Ejecuta la aplicación
CMD ["npm", "start"]
