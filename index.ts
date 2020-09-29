import { BuilderContext, BuilderOutput, createBuilder, targetFromTargetString } from '@angular-devkit/architect';
import * as path from 'path';
import { JsonObject, normalize  } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { BrowserBuilderOptions } from "@angular-devkit/build-angular";
import { augmentAppWithServiceWorker } from "@angular-devkit/build-angular/src/angular-cli-files/utilities/service-worker";


interface Options extends JsonObject {
  browserTarget: string;
}

async function buildServiceWorker(options: Options, context: BuilderContext): Promise<BuilderOutput> {
  const host = new NodeJsSyncHost();
  const root = normalize(context.workspaceRoot);

  const projectName = context.target?.project;
  if (!projectName) {
    throw new Error('The builder requires a target.');
  }
  if (!options.browserTarget) {
    throw new Error('The builder requires a browserTarget.');
  }
  const browserTarget = targetFromTargetString(options.browserTarget);
  const browserOptions = await context.getTargetOptions(browserTarget) as unknown as BrowserBuilderOptions;
  const projectMetadata = await context.getProjectMetadata(projectName);
  const baseOutputPath = path.resolve(context.workspaceRoot, browserOptions.outputPath);

  if (browserOptions.serviceWorker) {
    try {
      await augmentAppWithServiceWorker(
        host,
        root,
        normalize(projectMetadata.root as string ?? ''),
        normalize(baseOutputPath),
        browserOptions.baseHref || '/',
        browserOptions.ngswConfigPath,
      );
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }

  return {
    success: true
  }
}

export default createBuilder<Options>(buildServiceWorker);
