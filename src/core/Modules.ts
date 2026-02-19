import Sex from '../modules/Sex';
import Pornhub from '../modules/Pornhub';
import Redtube from '../modules/Redtube';
import Xvideos from '../modules/Xvideos';
import Youporn from '../modules/Youporn';
import Motherless from '../modules/Motherless';
import { ModuleConstructor } from '../types';

/**
 * Registry of available modules
 * Maps module names (lowercase) to their constructor functions
 */
interface ModulesRegistry {
  [key: string]: ModuleConstructor;
}

/**
 * Central registry of all supported modules
 * Each key is a lowercase module name that can be used with driver()
 *
 * @example
 * ```typescript
 * // Access a module
 * const PornhubModule = modules['pornhub'];
 * const instance = new PornhubModule('search query');
 * ```
 */
const modules: ModulesRegistry = {
  sex: Sex,
  pornhub: Pornhub,
  redtube: Redtube,
  xvideos: Xvideos,
  youporn: Youporn,
  motherless: Motherless,
};

export default modules;
