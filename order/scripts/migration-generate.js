const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const name = process.env.npm_config_name;

if (!name) {
  console.error(
    '❌ Please provide a name: npm run migration:generate --name=YourMigrationName',
  );
  process.exit(1);
}

// Ensure the migrations folder exists
const migrationsDir = path.join(
  __dirname,
  '..',
  'src',
  'database',
  'migrations',
);
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

console.log(`📦 Generating migration: ${name}`);

const result = spawnSync(
  'npx.cmd', // Windows-friendly
  [
    'typeorm-ts-node-commonjs',
    'migration:generate',
    `./src/database/migrations/${name}`,
    '-d',
    './src/database/data-source.ts',
  ],
  {
    stdio: 'inherit',
    shell: true,
  },
);

if (result.status !== 0) {
  console.error('❌ Migration generation failed.');
  process.exit(result.status);
}
