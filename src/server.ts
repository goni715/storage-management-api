import app from './app';
import dbConnect from './app/utils/dbConnect';

dbConnect();

app.listen(5000, ()=> {
    console.log(`Server running at @5000 port`);
})