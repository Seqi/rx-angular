import {
  ZoneGlobalDisableConfigurationsKey,
  zoneGlobalDisableConfigurationsKeys,
  ZoneGlobalEventsConfigurationsKey,
  zoneGlobalEventsConfigurationsKeys,
  ZoneGlobalSettingsConfigurationsKey,
  zoneGlobalSettingsConfigurationsKeys,
  ZoneRuntimeConfigurationsKey,
  zoneRuntimeConfigurationsKeys,
  ZoneTestDisableConfigurationsKey,
  zoneTestDisableConfigurationsKeys,
  ZoneTestSettingsConfigurationsKey,
  zoneTestSettingsConfigurationsKeys
} from './model/configurations.types';
import { ZoneGlobalConfigurations } from './model/zone.configurations.api';

type GlobalDisableConfigurationMethods = {
  [disabledFlag in ZoneGlobalDisableConfigurationsKey]: (isDisabled?: boolean) => void;
} & {
  [symbolFlag in ZoneGlobalSettingsConfigurationsKey]: (isDisabled?: boolean) => void;
};

type TestDisableConfigurationMethods = {
  [disabledFlag in ZoneTestDisableConfigurationsKey]: (isDisabled?: boolean) => void
} & {
  [symbolFlag in ZoneTestSettingsConfigurationsKey]: (isDisabled?: boolean) => void
};

type ZoneGlobalEventsConfigurationsMethods = {
  [disabledFlag in ZoneGlobalEventsConfigurationsKey]: (eventNames: string[]) => void;
}

type RuntimeConfigurationMethods = {
  [disabledFlag in ZoneRuntimeConfigurationsKey]: (isDisabled?: boolean) => void;
}

const zoneDisable = '__Zone_disable_';
const zoneSymbol = '__zone_symbol__';

function getZoneFlagsConfigurator(): ZoneFlagsConfigurator {
  const cfg = window as unknown as ZoneGlobalConfigurations & { __Zone_ignore_on_properties: { target: any, ignoreProperties: string[] }[] };

  return {
    global: {
      disable: zoneGlobalDisableConfigurationsKeys
        .map(prop => ({ [prop]: (isDisabled: boolean = true) => cfg[zoneDisable + prop] = isDisabled }))
        .concat(
          zoneGlobalSettingsConfigurationsKeys
            .map(prop => ({ [prop]: (isDisabled: boolean = true) => cfg[zoneSymbol + prop] = isDisabled }))
        )
        .reduce((map, item) => ({ ...map, ...item }), {} as GlobalDisableConfigurationMethods)
    },
    test: {
      disable: zoneTestDisableConfigurationsKeys
        .map(prop => ({ [prop]: (isDisabled: boolean = true) => cfg[zoneDisable + prop] = isDisabled }))
        .concat(
          zoneTestSettingsConfigurationsKeys
            .map(prop => ({ [prop]: (isDisabled: boolean = true) => cfg[zoneSymbol + prop] = isDisabled }))
        )
        .reduce((map, item) => ({ ...map, ...item }), {} as TestDisableConfigurationMethods)
    },
    events: {
      disable: zoneGlobalEventsConfigurationsKeys
        .map(prop => ({ [prop]: (eventNames: string[]) => cfg[zoneSymbol + prop] = [...cfg[zoneSymbol + prop], ...eventNames] }))
        .reduce((map, item) => ({ ...map, ...item }), {} as ZoneGlobalEventsConfigurationsMethods)
    },
    runtime: {
      disable: zoneRuntimeConfigurationsKeys
        .reduce((map, prop) => ({
          ...map,
          [prop]: (isDisabled: boolean = true) => cfg[zoneSymbol + prop] = isDisabled
        }), {} as RuntimeConfigurationMethods)
    }
  };
}


export interface ZoneFlagsConfigurator {
  global: {
    disable: GlobalDisableConfigurationMethods
  },
  test: {
    disable: TestDisableConfigurationMethods
  },
  events: {
    disable: ZoneGlobalEventsConfigurationsMethods
  }
  runtime: {
    disable: RuntimeConfigurationMethods
  },
}

export const zoneFlagsConfigurator = getZoneFlagsConfigurator();
