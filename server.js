const express = require('express');
const app = express();
const port = 3000;
const userRouter = require('./routes/users');
const showRouter = require('./routes/shows');


app.use(express.json());


app.use('/users', userRouter);
app.use('/shows', showRouter);






app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
    });



