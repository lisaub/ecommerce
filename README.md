# Proyecto de E-commerce de Teléfonos Móviles

## Descripción

Este proyecto es un servidor basado en Node.js y Express para gestionar productos y carritos de compra en un e-commerce de teléfonos móviles. El servidor escucha en el puerto 8080 y dispone de dos grupos de rutas: `/api/products` y `/api/carts`.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/lisaub/ecommerce.git
   cd ecommerce-server   ```

2. Instala las dependencias:
   ```bash
   npm install   ```


## Uso

1. Inicia el servidor:
   ```bash
   npm start

2. El servidor estará disponible en http://localhost:8080.


## Endpoints

### Productos

- **GET /api/products/**: Lista todos los productos. Se puede limitar el número de productos con el parámetro `?limit`.
- **GET /api/products/:pid**: Obtiene un producto por su ID.
- **POST /api/products/**: Agrega un nuevo producto. Campos requeridos:
  - `title`: String
  - `description`: String
  - `code`: String
  - `price`: Number
  - `status`: Boolean (por defecto `true`)
  - `stock`: Number
  - `category`: String
  - `thumbnails`: Array de Strings (opcional)
- **PUT /api/products/:pid**: Actualiza un producto por su ID. No se puede actualizar el campo `id`.
- **DELETE /api/products/:pid**: Elimina un producto por su ID.

### Carritos

- **POST /api/carts/**: Crea un nuevo carrito.
- **GET /api/carts/:cid**: Lista los productos de un carrito por su ID.
- **POST /api/carts/:cid/product/:pid**: Agrega un producto al carrito. Si el producto ya existe en el carrito, incrementa la cantidad.

## Estructura del Proyecto

ecommerce-server/
│
├── src/
│   ├── controllers/
│   │   ├── productsController.js
│   │   └── cartsController.js
│   ├── data/
│   │   ├── products.json
│   │   └── carts.json
│   ├── routes/
│   │   ├── products.js
│   │   └── carts.js
│   └── server.js
│
├── package.json
└── README.md
