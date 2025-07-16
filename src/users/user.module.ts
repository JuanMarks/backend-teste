import { Module } from "@nestjs/common";
import { UserServices } from "./user.service";
import { UserController } from "./user.controller";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
@Module({
    imports: [],
    providers: [UserServices, CloudinaryService],
    controllers: [UserController],
    exports: [UserServices]
})

export class UserModule {}