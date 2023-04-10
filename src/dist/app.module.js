"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var projects_module_1 = require("./projects/projects.module");
var documents_module_1 = require("./documents/documents.module");
var elements_module_1 = require("./elements/elements.module");
var typeorm_2 = require("./typeorm");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return ({
                        type: 'postgres',
                        url: configService.get('DB_URL'),
                        // use for debugging
                        // host: configService.get('DB_HOST'),
                        // port: configService.get<number>('DB_PORT'),
                        // username: configService.get('DB_USERNAME'),
                        // password: configService.get('DB_PASSWORD'),
                        // database: configService.get('DB_NAME'),
                        entities: typeorm_2["default"],
                        synchronize: true
                    }); },
                    inject: [config_1.ConfigService]
                }),
                projects_module_1.ProjectsModule,
                documents_module_1.DocumentsModule,
                elements_module_1.ElementsModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
