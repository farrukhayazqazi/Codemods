// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "babel";

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let defaultDec;
  let ExportedFuncName;

  defaultDec = root.find(j.ExportDefaultDeclaration).nodes();

  if (defaultDec.length) {
    ExportedFuncName = defaultDec[0].declaration.name;
    root.find(j.ExportDefaultDeclaration).remove();
  }

  let variableFuncs = [];

  // check for arrow function or variable assigned to function
  variableFuncs = root
    .find(j.VariableDeclaration)
    .forEach((path) => path.node.declarations.filter((decPath) => decPath.type === "VariableDeclarator"));

  // if variable declarations with variable declarators
  if (variableFuncs.length) {
    variableFuncs.forEach((path) => {
      if (path.parent.node.type == "Program") {
        path.node.declarations.forEach((decPath) => {
          const init = decPath.init;
          let name;

          if (init.id) {
            name = init.id.name;
          } else {
            name = decPath.id.name;
          }

          const convertedFuncDeclaration = j.functionDeclaration(j.identifier(name), init.params, init.body);
          j(path).replaceWith(convertedFuncDeclaration);

          const exportDefault = j.exportDefaultDeclaration(path.node);
          j(path).replaceWith(exportDefault);
        });
      }
    });
  }

  if (ExportedFuncName) {
    root.find(j.FunctionDeclaration, { id: { name: ExportedFuncName } }).forEach((path) => {
      if (path.parent.node.type == "Program") {
        const exportDefault = j.exportDefaultDeclaration(path.node);
        j(path).replaceWith(exportDefault);
      }
    });
  }

  root.find(j.FunctionDeclaration).forEach((path) => {
    if (path.parent.node.type == "Program") {
      const exportDefault = j.exportDefaultDeclaration(path.node);
      j(path).replaceWith(exportDefault);
    }
  });

  return root.toSource();
}
