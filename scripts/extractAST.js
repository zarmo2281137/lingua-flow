const fs = require('fs');
const ts = require('typescript');

const files = [
  './src/data/courses/a1Lessons.ts',
  './src/data/courses/a2Lessons.ts',
  './src/data/courses/b1Lessons.ts',
  './src/data/courses/b2Lessons.ts',
  './src/data/courses/c1Lessons.ts',
];

const topics = [];

for (const filePath of files) {
  const code = fs.readFileSync(filePath, 'utf8');
  const sf = ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true);

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      let id, level, order, lessonNumber, titleEn, titleUk, unitTitleUk, descriptionUk;
      for (const prop of node.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          const name = prop.name.text;
          if (name === 'id' && ts.isStringLiteral(prop.initializer)) id = prop.initializer.text;
          if (name === 'level' && ts.isStringLiteral(prop.initializer)) level = prop.initializer.text;
          if (name === 'order' && ts.isNumericLiteral(prop.initializer)) order = parseInt(prop.initializer.text);
          if (name === 'lessonNumber' && ts.isNumericLiteral(prop.initializer)) lessonNumber = parseInt(prop.initializer.text);
          if (name === 'titleEn' && ts.isStringLiteral(prop.initializer)) titleEn = prop.initializer.text;
          if (name === 'titleUk' && ts.isStringLiteral(prop.initializer)) titleUk = prop.initializer.text;
          if (name === 'unitTitleUk' && ts.isStringLiteral(prop.initializer)) unitTitleUk = prop.initializer.text;
          if (name === 'descriptionUk' && ts.isStringLiteral(prop.initializer)) descriptionUk = prop.initializer.text;
        }
      }
      if (id && level && (lessonNumber || order) && titleEn && titleUk) {
        topics.push({
          id,
          level,
          order: lessonNumber || order,
          unitTitleUk: unitTitleUk || '',
          titleEn,
          titleUk,
          descriptionUk: descriptionUk || '',
        });
        return; // don't inspect nested objects
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sf);
}

console.log('Total AST extracted topics:', topics.length);
const byLevel = {};
for (const t of topics) {
  byLevel[t.level] = (byLevel[t.level] || 0) + 1;
}
console.log('By level:', byLevel);
fs.writeFileSync('./scripts/all80Topics.json', JSON.stringify(topics, null, 2));
