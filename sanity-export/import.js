const path = require('path');
const fs = require('fs');
const sanityClient = require('@sanity/client');
const sanityImport = require('@sanity/import');
const Configstore = require('configstore');

const config = new Configstore('sanity', {}, {globalConfigPath: true});
const token = process.env.SANITY_TOKEN || config.get('authToken');
const dataset = process.env.SANITY_DATASET || 'production';
const projectId = process.env.SANITY_PROJECT_ID || process.argv[2];
const exportPath = path.join(__dirname, 'export.json');

if (!token) {
    console.error('no sanity token provided, either provide an API token via "SANITY_TOKEN" environment variable or login into sanity using sanity cli "sanity login"');
    process.exit(1);
}

if (!projectId) {
    console.error('no project id provided, either provide project id via "SANITY_PROJECT_ID" environment variable or as a first argument to this script');
    process.exit(1);
}

const client = sanityClient({
    projectId,
    dataset,
    token,
    useCdn: false
});

// `create`, `createOrReplace` or `createIfNotExists`
const operation = 'createOrReplace';
const input = fs.createReadStream(exportPath);

sanityImport(input, {
    client: client,
    operation: operation
}).then(({ numDocs, warnings }) => {
    console.log('imported %d documents', numDocs);
    console.log('warnings:', warnings);
    // Note: There might be warnings! Check `warnings`
}).catch(err => {
    console.error('Import failed: %s', err.message);
});
