"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ElementsModule = void 0;
var common_1 = require("@nestjs/common");
var elements_service_1 = require("./elements.service");
var typeorm_1 = require("@nestjs/typeorm");
var element_entiry_1 = require("../typeorm/element.entiry");
var ElementsModule = /** @class */ (function () {
    function ElementsModule() {
    }
    ElementsModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([element_entiry_1.Element])],
            providers: [elements_service_1.ElementsService]
        })
    ], ElementsModule);
    return ElementsModule;
}());
exports.ElementsModule = ElementsModule;
