const fs = require('fs');

const files = [
  { level: 'A1', file: './src/data/courses/a1Lessons.ts' },
  { level: 'A2', file: './src/data/courses/a2Lessons.ts' },
  { level: 'B1', file: './src/data/courses/b1Lessons.ts' },
  { level: 'B2', file: './src/data/courses/b2Lessons.ts' },
  { level: 'C1', file: './src/data/courses/c1Lessons.ts' },
];

const topics = [];

for (const { level, file } of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Match objects that have id, level, lessonNumber/order, titleEn, titleUk
  const regex = /{\s*id:\s*['"]([^'"]+)['"],\s*level:\s*['"]([^'"]+)['"],[\s\S]*?lessonNumber:\s*(\d+),[\s\S]*?titleEn:\s*['"]([^'"]+)['"],\s*titleUk:\s*['"]([^'"]+)['"]/g;
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    topics.push({
      id: match[1],
      level: match[2],
      lessonNumber: parseInt(match[3]),
      titleEn: match[4],
      titleUk: match[5],
    });
  }
}

console.log('Total extracted topics:', topics.length);
fs.writeFileSync('./scripts/extracted80Topics.json', JSON.stringify(topics, null, 2));
console.log('Sample topic:', topics[0]);
