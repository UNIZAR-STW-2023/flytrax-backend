# Utiliza la imagen base Node.js
FROM node:16

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

COPY . .

EXPOSE 8000

# Ejecuta la aplicación
CMD ["npm", "start"]
