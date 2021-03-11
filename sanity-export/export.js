const path = require('path');
const fs = require('fs');
const sanityClient = require('@sanity/client');
const exportDataset = require('@sanity/export');
const Configstore = require('configstore');


const config = new Configstore('sanity', {}, {globalConfigPath: true});
const token = process.env.SANITY_TOKEN || config.get('authToken');
const dataset = process.env.SANITY_DATASET || 'production';
const projectId = process.env.SANITY_PROJECT_ID || process.argv[2];
const outputPath = path.join(__dirname, 'export.json');

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

let currentStep = null;
const options = {
    client: client,
    dataset: dataset,
    outputPath: outputPath,

    compress: false,
    drafts: true,
    assets: true,
    raw: false,
    assetConcurrency: 5,
    // types: '',

    onProgress: ({ step, current, total, update }) => {
        if (currentStep !== step) {
            if (currentStep) {
                return;
            }
            currentStep = step;
            console.log(step);
        }
    }
};

console.log('Start Sanity export');
exportDataset(options).then(() => {
    console.log('Start export finished');
});
