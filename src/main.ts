import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser"

async function start() {
  try {
    const PORT = process.env.PORT || 3001;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api")

    app.enableCors({
      origin:(origin, callback)=>{
        const allowedOrigins = [
          "http://localhost:8000",
          "http://localhost:3000",
          "https://east-way.uz",
          "https://api.east-way.uz",
          "https://east-way.vercel.app",
        ]
        if(!origin || allowedOrigins.includes(origin)){
          callback(null, true)
        }else{
          callback(new BadRequestException("Not allowed by CORS"))
        }
      },
      methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials:true  //cookie va header
    })
    const config = new DocumentBuilder()
      .setTitle("East-Way project")
      .setDescription("NestJs Api")
      .setVersion("1.0")
      .addTag("Swagger, Validation")
      .addBearerAuth()
      .build()

      const document = SwaggerModule.createDocument(app, config)
      SwaggerModule.setup("api/docs", app, document)
    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
