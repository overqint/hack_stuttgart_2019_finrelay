import { NodeTypesClass } from "./node-types-class.const";

let nodeTypesInstance: NodeTypesClass | undefined;

export function NodeTypes(): NodeTypesClass {
  if (nodeTypesInstance === undefined) {
    nodeTypesInstance = new NodeTypesClass();
    nodeTypesInstance.init({});
  }
  return nodeTypesInstance;
}
