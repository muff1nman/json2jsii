import * as fs from 'fs';
import * as path from 'path';
import { JSONSchema4 } from 'json-schema';
import { TypeGenerator } from '../src';

test('example with $ref', async () => {

  const input = fs.readFileSync(path.join(__dirname, 'schema/rules.json'), 'utf8');
  const parsed: JSONSchema4 = JSON.parse(input) as JSONSchema4;
  const tg = new TypeGenerator({
    definitions: parsed.definitions,
  });

  for (const parsedKey in parsed.definitions) {
    const name = TypeGenerator.normalizeTypeName(parsedKey);
    tg.emitType(name, parsed.definitions[parsedKey]);
  }

  expect(tg.render()).toMatchSnapshot();
});