import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function start() {
  try {
    const PORT = process.env.PORT || 3001;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    const allowedOrigins = [
      "http://localhost:8000",
      "http://localhost:3000",
      "https://eastway-api.mern.uz",
      "https://east-way.vercel.app",
    ];

    app.enableCors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowed by CORS"));
        }
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle("East-Way project")
      .setDescription("NestJs Api")
      .setVersion("1.0")
      .addTag("Swagger, Validation")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    app.useStaticAssets(join(__dirname, "..", "uploads"), {
      prefix: "/uploads/",
    });

    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
