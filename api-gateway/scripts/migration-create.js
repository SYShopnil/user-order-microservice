const { execSync } = require('child_process');

const name = process.env.npm_config_name;

if (!name) {
  console.error(
    '❌ Please provide a name: npm run migration:create --name=YourMigrationName',
  );
  process.exit(1);
}

const cmd = `npx typeorm-ts-node-commonjs migration:create ./src/database/migrations/${name}`;
console.log(`📄 Creating empty migration: ${name}`);
execSync(cmd, { stdio: 'inherit' });
