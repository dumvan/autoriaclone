import express from "express"
import {apiRouter} from "./routers/api.router.js";
import {configs} from "./configs/configs.js";
import {errorController} from "./controllers/error.controller.js";
import fileUpload from "express-fileupload";
import swaggerUi from "swagger-ui-express"
import swaggerJson from "../docs/swagger.json" with {type: 'json'}
import mongoose from "mongoose";
import {cronRunner} from "./crons/index.js";
import {swaggerOptions} from "../docs/swagger.options.js";
import path from "node:path";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.set('query parser', 'extended');
app.use('/assets', express.static(path.join(process.cwd(), 'docs', 'assets')));
app.use(fileUpload())

app.use('/', apiRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson, swaggerOptions))
app.use('/{*any}', errorController.showNonExistentApiError)
app.use(errorController.showError)

const connectMongoDB = async () => {
    let isConnected = false
    while(!isConnected){
        try{
            console.log("Connecting to MongoDB...")
            await mongoose.connect(configs.MONGO_URI)
            isConnected = true
            console.log("MongoDB is successfully connected!")
        }
        catch{
            console.log("Connecting is failed. Waiting 3 second...")
            await new Promise((resolve) => setTimeout(resolve, 3000))
        }
    }
}

app.listen(configs.APP_PORT, async () => {
    cronRunner()
    await connectMongoDB()
    console.log(`Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`)
})


