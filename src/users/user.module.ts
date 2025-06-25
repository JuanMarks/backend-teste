import { Module } from "@nestjs/common";
import { UserServices } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    imports: [],
    providers: [UserServices],
    controllers: [UserController],
    exports: [UserServices]
})

export class UserModule {}