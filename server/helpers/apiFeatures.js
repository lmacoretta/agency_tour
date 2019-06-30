class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    /** Filtro la query */
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    /** Filtro mas avanzado */
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this; //devuelvo el objeto entero
  }

  sort() {
    /** Filtro por sort */
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    /** Filtro por fields */
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields); //Selecciono esos campos.
    } else {
      this.query = this.query.select('-__v'); //Excluyo el __v que usa mongo internamente.
    }

    return this;
  }

  paginate() {
    /** Paginacion */
    const page = this.queryString.page * 1 || 1; //this.queryString.page * 1 transforma una string a num
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
