Documentacion:

- GET - <b>api/v1/tours</b>
  Esta ruta trae todos los tours. Tambien podemos filtrar segun las caracteristicas que tiene un tour, por ejemplo por su duration, difficulty, price, etc.
  A su vez, podemos filtrar por sort, limit y fields.

Ejemplos:

- sort: /api/v1/tours?sort=-price \* Me trae los tours con los precios mas caros.
- limit: /api/v1/tours?limit=5 \* Me trae solo 5 tours.
- fields: /api/v1/tours?fields=name,price,duration \* Me trae todos los tours pero solo con los campos name, price, duration.

Tambien podemos aplicar filtros mas avanzado, ejemplo /api/v1/tours?duration[gte]=5&difficulty=easy En este caso va traer los que sean de duracion mas grande que 5 y que la dificulta sea facil.

Filtros avanzados serian: gte, gt, lte, lt.

- gte: greater than or equal.
- gt: greater than.
- lte: less than or equal.
- lt: less than.
