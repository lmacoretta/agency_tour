import app from '../server/app';

/** Server */
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
  console.log(`Server iniciado en el puerto ${app.get('port')}`);
});