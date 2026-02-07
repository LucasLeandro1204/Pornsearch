import Sex from '../modules/Sex';
import Pornhub from '../modules/Pornhub';
import Redtube from '../modules/Redtube';
import Xvideos from '../modules/Xvideos';
import Youporn from '../modules/Youporn';
import Motherless from '../modules/Motherless';
import { ModuleConstructor } from '../types';

interface ModulesRegistry {
  [key: string]: ModuleConstructor;
}

const modules: ModulesRegistry = {
  sex: Sex,
  pornhub: Pornhub,
  redtube: Redtube,
  xvideos: Xvideos,
  youporn: Youporn,
  motherless: Motherless,
};

export default modules;
