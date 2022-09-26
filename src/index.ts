import { app } from "./db";
import { AppDataSource } from "./db/data-source";

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database conected');
        app.listen(3000);
        console.log('Server is listening on port', 3000);
    } catch (error) {
        console.log(error);
    }
};
main();
