import { i18n } from '@kbn/i18n';
import { AppMountParameters, AppNavLinkStatus, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import {
  KbnTrafficlightVisPluginSetup,
  KbnTrafficlightVisPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';
import { trafficLightDefinition } from './trafficlightvis';
import { VisualizationsSetup } from '../../../src/plugins/visualizations/public';

/** @internal */
export interface TablePluginSetupDependencies {
  visualizations: VisualizationsSetup;
}

export class KbnTrafficlightVisPlugin
  implements Plugin<KbnTrafficlightVisPluginSetup, KbnTrafficlightVisPluginStart> {
  createBaseVisualization: any;
  public setup(
    core: CoreSetup,
    { visualizations }: TablePluginSetupDependencies
  ): KbnTrafficlightVisPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'kbnTrafficlightVis',
      title: PLUGIN_NAME,
      navLinkStatus: AppNavLinkStatus.hidden, // imported from `src/core/public`
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in kibana.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });
    visualizations.createBaseVisualization(trafficLightDefinition(core));

    // Return methods that should be available to other plugins
    return {
      getGreeting() {
        return i18n.translate('kbnTrafficlightVis.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }
  // public async setup(
  //   core: CoreSetup,
  //   { visualizations }: TablePluginSetupDependencies
  // ): Promise<any> {
  //   visualizations.createBaseVisualization(trafficLightDefinition(core));
  // }

  public start(core: CoreStart): KbnTrafficlightVisPluginStart {
    return {};
  }

  public stop() {}
}
