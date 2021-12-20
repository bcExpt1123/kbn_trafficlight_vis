import './index.scss';

import { KbnTrafficlightVisPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new KbnTrafficlightVisPlugin();
}
export { KbnTrafficlightVisPluginSetup, KbnTrafficlightVisPluginStart } from './types';
