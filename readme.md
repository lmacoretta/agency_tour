Documentacion:

- <b>GET - api/v1/tours</b>
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

- <b>GET - /api/v1/tours/montly-plan/2021</b>
  Esta ruta calcula el numero de tours por mes que va haber durante el 2021. Esta echo con mongoose pipeline.

Nos va devolver:

- El numero de tours que tiene ese mes.
- Los nombres de los tours.
- El numero del mes.

- <b>GET - /api/v1/tours/tour-stats</b>
  Esta ruta tira una estadistica de los tours segun el nivel de dificultad. Tambien filtra por el ratingsAverage que sea mayor a 4.5

Nos va devolver:

- El id con el nivel de dificultad. Easy, medium o dificulty.
- El numero de tours que hay en esa dificultad.
- El numero de ratings que tiene los tours en esa difucultad.
- El promedio del rating de los tours en esa dificultad.
- El precio promedio de los tours.
- El precio mas barato de todos los tours en esa dificultad.
- El precio mas caro de todos los tours en esa dificultad.
