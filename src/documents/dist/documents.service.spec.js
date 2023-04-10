"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var testing_1 = require("@nestjs/testing");
var documents_service_1 = require("./documents.service");
var document_entity_1 = require("../typeorm/document.entity");
var typeorm_1 = require("@nestjs/typeorm");
var document_element_entity_1 = require("../typeorm/document-element.entity");
var element_entiry_1 = require("../typeorm/element.entiry");
var MOCK_RESPONSE_DOCUMENT = {
    id: '1',
    documentName: 'My Doc1',
    createdAt: '2023-04-09T16:14:17.551Z',
    updatedAt: '2023-04-09T16:14:17.551Z',
    isActive: true,
    documentElements: [
        {
            id: '128',
            order: '0',
            createdAt: '2023-04-10T09:16:32.536Z',
            updatedAt: '2023-04-10T09:16:32.536Z',
            element: {
                id: '1',
                type: 'button',
                createdAt: '2023-04-09T14:42:10.945Z',
                updatedAt: '2023-04-09T14:42:10.945Z'
            }
        },
    ]
};
var MOCK_CREATE_DOCUMENT_DTO = {
    projectId: 1,
    documentName: 'test',
    elements: [1, 2, 3]
};
var MOCK_UPDATE_DOCUMENT_DTO = {
    id: 1,
    documentName: 'test',
    elements: [1, 2, 3]
};
describe('DocumentsService', function () {
    var service;
    var documentsRepository;
    var documentElementRepository;
    var elementRepository;
    var DOCUMENTS_REPOSITORY_TOKEN = typeorm_1.getRepositoryToken(document_entity_1.Document);
    var DOCUMENT_ELEMENT_REPOSITORY_TOKEN = typeorm_1.getRepositoryToken(document_element_entity_1.DocumentElement);
    var ELEMENT_REPOSITORY_TOKEN = typeorm_1.getRepositoryToken(element_entiry_1.Element);
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            documents_service_1.DocumentsService,
                            {
                                provide: DOCUMENTS_REPOSITORY_TOKEN,
                                useValue: {
                                    get: jest.fn(),
                                    create: jest.fn(),
                                    findOne: jest.fn(function (id) {
                                        return MOCK_RESPONSE_DOCUMENT;
                                    }),
                                    save: jest.fn(function (document) {
                                        return new document_entity_1.Document();
                                    })
                                }
                            },
                            {
                                provide: DOCUMENT_ELEMENT_REPOSITORY_TOKEN,
                                useValue: {
                                    get: jest.fn(),
                                    save: jest.fn(),
                                    create: jest.fn(),
                                    remove: jest.fn(function (el) {
                                        return true;
                                    })
                                }
                            },
                            {
                                provide: ELEMENT_REPOSITORY_TOKEN,
                                useValue: {
                                    get: jest.fn(),
                                    find: jest.fn(function () {
                                        return [new element_entiry_1.Element(), new element_entiry_1.Element()];
                                    })
                                }
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    service = module.get(documents_service_1.DocumentsService);
                    documentsRepository = module.get(DOCUMENTS_REPOSITORY_TOKEN);
                    documentElementRepository = module.get(DOCUMENTS_REPOSITORY_TOKEN);
                    elementRepository = module.get(ELEMENT_REPOSITORY_TOKEN);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be defined', function () {
        expect(service).toBeDefined();
    });
    it('documentsRepository should be define', function () {
        expect(documentsRepository).toBeDefined();
    });
    it('documentElementRepository should be define', function () {
        expect(documentsRepository).toBeDefined();
    });
    it('elementRepository should be define', function () {
        expect(documentsRepository).toBeDefined();
    });
    describe('getDocumentById', function () {
        it('should retrieve documents with list of elements', function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.getDocumentById(1)];
                    case 1:
                        results = _a.sent();
                        expect(results).toHaveProperty('id', '1');
                        expect(results.documentElements).toHaveLength(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('createDocument', function () {
        it('should create document and return it data', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.createDocument(MOCK_CREATE_DOCUMENT_DTO)];
                    case 1:
                        _a.sent();
                        expect(documentsRepository.save).toBeCalledTimes(1);
                        expect(elementRepository.find).toBeCalledTimes(1);
                        expect(documentElementRepository.save).toBeCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('updateDocumentById', function () {
        it('should update document and it elements', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.updateDocumentById(new document_entity_1.Document(), MOCK_UPDATE_DOCUMENT_DTO)];
                    case 1:
                        _a.sent();
                        expect(documentElementRepository.save).toBeCalledTimes(1);
                        expect(elementRepository.find).toBeCalledTimes(1);
                        expect(documentsRepository.save).toBeCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
