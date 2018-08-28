import { GenericClassDecorator, Type } from './util';

/**
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
const Service = (): GenericClassDecorator<Type<any>> => {
  return (target: Type<any>) => {
    // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
  };
};

const Controller = (): ClassDecorator => {
  return target => {
    // maybe do something with controller here
  };
};

export { Service, Controller }