import { NestFactory } from "@nestjs/core";
import { AppModule } from "./components/app/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as helmet from "helmet";
declare const module: any;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "http://localhost:3001",
  });
  const options = new DocumentBuilder()
    .setTitle("Api v1")
    .setDescription("The API for vibe APP")
    .setVersion("1.0")
    .addBearerAuth({ in: "header", type: "http" })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};

bootstrap();
