const express = require('express');

const app = express();
app.use(express.json());
app.use('/api/v1', require('./routes/api/v1'));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});