import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { query } from '../lib/db.js';
import { parseJson } from './parse.js';

dotenv.config();

const prisma = new PrismaClient();

const SCHEMA_FILE = './sql/schema.sql';
const DROP_SCHEMA_FILE = './sql/drop.sql';
const DATA_DIR = './data';

export async function createSchema(schemaFile = SCHEMA_FILE) {
  const data = await readFile(schemaFile);

  return query(data.toString('utf-8'));
}

export async function dropSchema(dropFile = DROP_SCHEMA_FILE) {
  const data = await readFile(dropFile);

  return query(data.toString('utf-8'));
}

async function setup() {
  // const drop = await dropSchema();

  // if (drop) {
  //   console.info('schema dropped');
  // } else {
  //   console.info('schema not dropped, exiting');
  //   poolEnd();
  //   return process.exit(-1);
  // }

  // const result = await createSchema();

  // if (result) {
  //   console.info('schema created');
  // } else {
  //   console.info('schema not created, exiting');
  //   poolEnd();
  //   return process.exit(-1);
  // }

  const indexFile = await readFile(join(DATA_DIR, 'index.json'));
  const indexData = parseJson(indexFile.toString('utf-8'));

  const testCategory = await prisma.category.create({
    data: {
      questionText: 'text',
      description: 'desc',
    },
  });

  const adminUser = await prisma.users.create({
    data: {
      username: 'admin',
      password: '123',
      admin: true,
    },
  });

  for (const item of indexData) {
    // eslint-disable-next-line no-await-in-loop
    const itemToInsert = await prisma.items.create({
      data: {
        name: item.name,
        categoryId: item.categoryId, // id eða nafn?
        imageURL: item.imageURL,
      },
    });

    if (!itemToInsert) {
      console.error('unable to insert item', item);
      continue;
    } else {
      console.log(itemToInsert);
    }
  }

  await prisma.$disconnect();
}

setup().catch((err) => {
  console.error('error running setup', err);
});
