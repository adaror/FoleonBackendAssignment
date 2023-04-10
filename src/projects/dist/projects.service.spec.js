"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var projects_service_1 = require("./projects.service");
var projects_entity_1 = require("../typeorm/projects.entity");
var typeorm_1 = require("@nestjs/typeorm");
var MOCK_PROJECT_CREATE_DTO = {
    userId: '12345',
    description: 'test',
    author: 'test'
};
var MOCK_PROJECT_UPDATE_DTO = {
    id: 1,
    description: 'test2',
    author: 'test'
};
describe('ProjectsService', function () {
    var service;
    var projectsRepository;
    var PROJECT_REPOSITORY_TOKEN = typeorm_1.getRepositoryToken(projects_entity_1.Project);
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            projects_service_1.ProjectsService,
                            {
                                provide: PROJECT_REPOSITORY_TOKEN,
                                useValue: {
                                    get: jest.fn(),
                                    create: jest.fn(function (project) {
                                        return {
                                            id: 1,
                                            description: project.description,
                                            userId: project.userId,
                                            author: project.author
                                        };
                                    }),
                                    save: jest.fn(function (project) {
                                        return {
                                            id: 1,
                                            description: project.description,
                                            author: project.author
                                        };
                                    }),
                                    findOne: jest.fn(function (id) {
                                        return { id: id, userId: 'test', description: '', author: '' };
                                    }),
                                    find: jest.fn(function () {
                                        return [new projects_entity_1.Project(), new projects_entity_1.Project()];
                                    }),
                                    update: jest.fn(function (id, project) {
                                        var mock = __assign({}, MOCK_PROJECT_CREATE_DTO);
                                        mock.description = project.description;
                                        return mock;
                                    })
                                }
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    service = module.get(projects_service_1.ProjectsService);
                    projectsRepository = module.get(PROJECT_REPOSITORY_TOKEN);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be defined', function () {
        expect(service).toBeDefined();
    });
    it('projectsRepository should be define', function () {
        expect(projectsRepository).toBeDefined();
    });
    describe('getProjects', function () {
        it('should retrieve array with a list of all of the projects', function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.getProjects()];
                    case 1:
                        results = _a.sent();
                        expect(results).toHaveLength(2);
                        expect(projectsRepository.find).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getProjectById', function () {
        it('should return single project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.getProjectById(1)];
                    case 1:
                        results = _a.sent();
                        expect(results).toHaveProperty('id');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('createProject', function () {
        it('should create and returned new project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.createProject(MOCK_PROJECT_CREATE_DTO)];
                    case 1:
                        results = _a.sent();
                        expect(results).toHaveProperty('id');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('updateProjectById', function () {
        it('should update attribute in project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.updateProjectById(MOCK_PROJECT_UPDATE_DTO)];
                    case 1:
                        results = _a.sent();
                        expect(results).toHaveProperty('description', 'test2');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
