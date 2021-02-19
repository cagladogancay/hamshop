const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
    console.log('Veritabanı bağlantısı başarılı')
}).catch((err) => {
    console.log('Veritabanına bağlanılamadı', err
    )
});