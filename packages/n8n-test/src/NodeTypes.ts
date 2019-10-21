import { NodeTypesClass } from "./NodeTypesClass";

let nodeTypesInstance: NodeTypesClass | undefined;

export function NodeTypes(): NodeTypesClass {
  if (nodeTypesInstance === undefined) {
    nodeTypesInstance = new NodeTypesClass();
    nodeTypesInstance.init({});
  }
  return nodeTypesInstance;
}
