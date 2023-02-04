import {Injectable} from "@angular/core";
import {DatatableConfigurationModel} from "../models/datatable-configuration.model";
import * as lodash from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class DatatableConfigService {
  constructor() {
  }
}

export function addDatatableConfig(datatablesConfig: DatatableConfigurationModel[], config: DatatableConfigurationModel): DatatableConfigurationModel[] {
  const datatablesConfigCopy = lodash.cloneDeep(datatablesConfig);
  const datatableConfigIndex = datatablesConfigCopy.findIndex((value: DatatableConfigurationModel) => value.tableId === config.tableId);
  if (datatableConfigIndex >= 0) {
    datatablesConfigCopy[datatableConfigIndex] = {...config};
  } else {
    datatablesConfigCopy.push(config);
  }
  return datatablesConfigCopy;
}
