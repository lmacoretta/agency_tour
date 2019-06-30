Documentacion:

La ruta api/v1/tours .get trae todos los tours. En esta ruta podemos filtrar segun las caracteristicas que tiene un tour, por ejemplo por su duration, difficulty, price, etc.
En caso que queramos filtrar por sort, limit, etc, la ruta va recortar esto y va mostrar otro filtro que hayas puesto (como la duration) o trae todo los tours.

Tambien podemos aplicar filtros mas avanzado por ejemplo mas grande que X elemento. Por ejemplo /api/v1/tours?duration[gte]=5&difficulty=easy En este caso va traer los que sean de duracion mas grande que 5 y que la dificulta sea facil.

Filtros avanzados serian: gte, gt, lte, lt.
