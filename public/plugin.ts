import { CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import {
  KbnTrafficlightVisPluginStart,
} from './types';
const trafficLightDefinition = require('./trafficlightvis').trafficLightDefinition;
import { VisualizationsSetup } from '../../../src/plugins/visualizations/public';

/** @internal */
export interface TablePluginSetupDependencies {
  visualizations: VisualizationsSetup;
}

export class KbnTrafficlightVisPlugin
  implements Plugin<void, KbnTrafficlightVisPluginStart> {
  createBaseVisualization: any;
  public setup(
    core: CoreSetup,
    { visualizations }: TablePluginSetupDependencies
  ) {
    visualizations.createBaseVisualization(trafficLightDefinition(core));
  }

  public start(core: CoreStart): KbnTrafficlightVisPluginStart {
    return {};
  }

  public stop() {}
}
