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
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const path = require("path");
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const service_worker_1 = require("@angular-devkit/build-angular/src/angular-cli-files/utilities/service-worker");
function buildServiceWorker(options, context) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const host = new node_1.NodeJsSyncHost();
        const root = core_1.normalize(context.workspaceRoot);
        const projectName = (_a = context.target) === null || _a === void 0 ? void 0 : _a.project;
        if (!projectName) {
            throw new Error('The builder requires a target.');
        }
        const browserTarget = architect_1.targetFromTargetString(options.browserTarget);
        const browserOptions = yield context.getTargetOptions(browserTarget);
        const projectMetadata = yield context.getProjectMetadata(projectName);
        const baseOutputPath = path.resolve(context.workspaceRoot, browserOptions.outputPath);
        if (browserOptions.serviceWorker) {
            try {
                yield service_worker_1.augmentAppWithServiceWorker(host, root, core_1.normalize((_b = projectMetadata.root) !== null && _b !== void 0 ? _b : ''), core_1.normalize(baseOutputPath), browserOptions.baseHref || '/', browserOptions.ngswConfigPath);
            }
            catch (e) {
                return {
                    success: false,
                    error: e
                };
            }
        }
        return {
            success: true
        };
    });
}
exports.default = architect_1.createBuilder(buildServiceWorker);
//# sourceMappingURL=index.js.map