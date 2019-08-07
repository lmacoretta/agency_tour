import React, { Fragment } from 'react';

const Setting = () => {
  return (
    <Fragment>
      <div className="setting">
        <div className="setting__container">
          <form>
            <h2 className="heading-secundary heading-secundary--sub u-mb-large">
              Configuración de su cuenta
            </h2>

            <div className="form-group">
              <label className="form-text">Nombre</label>
              <input
                type="text"
                name="name"
                className="form-input"
                autoComplete="off"
                required
                placeholder="Nombre"
              />
            </div>

            <div className="form-group">
              <label className="form-text">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                autoComplete="off"
                required
                placeholder="Email"
              />
            </div>

            <div className="setting__img-container">
              <img
                src="/images/Users/user-17.jpg"
                alt="Image user"
                className="setting__img"
              />
              <input type="file" className="setting__img-upload" name="photo" />
              <label htmlFor="photo">Subir nueva foto</label>
            </div>

            <div className="form-group u-txt-right">
              <a href="#" className="btn btn--sub btn--small u-mt-large">
                Guardar Cambios
              </a>
            </div>
          </form>
        </div>
        <div className="line">&nbsp;</div>
        <div className="setting__container">
          <form>
            <h2 className="heading-secundary heading-secundary--sub u-mb-large">
              Cambio de password
            </h2>

            <div className="form-group">
              <label className="form-text">Contraseña actual</label>
              <input
                type="text"
                name="password"
                className="form-input"
                autoComplete="off"
                required
                placeholder="●●●●●●"
              />
            </div>

            <div className="form-group">
              <label className="form-text">Nuevo password</label>
              <input
                type="password"
                name="newPassword"
                className="form-input"
                autoComplete="off"
                required
                placeholder="●●●●●●"
              />
            </div>

            <div className="form-group">
              <label className="form-text">Confirmar password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                autoComplete="off"
                required
                placeholder="●●●●●●"
              />
            </div>

            <div className="form-group u-txt-right">
              <a href="#" className="btn btn--sub btn--small u-mt-large">
                Guardar Password
              </a>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Setting;
