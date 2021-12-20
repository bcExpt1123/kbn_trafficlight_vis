import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface KbnTrafficlightVisPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface KbnTrafficlightVisPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
