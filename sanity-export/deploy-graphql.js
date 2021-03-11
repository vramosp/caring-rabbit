const path = require('path');
const sanityClient = require('@sanity/client');
const Configstore = require('configstore');
const gen1 = require('@sanity/core/lib/actions/graphql/gen1');
const gen2 = require('@sanity/core/lib/actions/graphql/gen2');
const gen3 = require('@sanity/core/lib/actions/graphql/gen3');
const extractFromSanitySchema = require('@sanity/core/lib/actions/graphql/extractFromSanitySchema');
const getSanitySchema = require('@sanity/core/lib/actions/graphql/getSanitySchema');


const config = new Configstore('sanity', {}, {globalConfigPath: true});
const token = process.env.SANITY_TOKEN || config.get('authToken');
const dataset = process.env.SANITY_DATASET || 'production';
const projectId = process.env.SANITY_PROJECT_ID || process.argv[2];
const workDir = path.join(__dirname, '../studio');

async function deployGraphQL(options) {
    const {
        workDir,
        projectId,
        token,
        dataset = 'production',
        tag = 'default',
        generation = 'gen3',
        enablePlayground = false,
        nonNullDocumentFields = false
    } = options;

    if (!token) {
        console.error('no sanity token provided, either provide an API token via "SANITY_TOKEN" environment variable or login into sanity using sanity cli "sanity login"');
        process.exit(1);
    }

    if (!projectId) {
        console.error('no project id provided, either provide project id via "SANITY_PROJECT_ID" environment variable or as a first argument to this script');
        process.exit(1);
    }

    console.log('deploying Sanity graphql', { projectId, dataset, tag, generation });

    const generations = {
        gen1,
        gen2,
        gen3
    };

    console.log('generate graphql schema');

    const sanitySchema = getSanitySchema(workDir);
    const extracted = extractFromSanitySchema(sanitySchema, { nonNullDocumentFields });
    const generateSchema = generations[generation];
    const schema = generateSchema(extracted);

    const client = sanityClient({
        projectId: projectId,
        dataset: dataset,
        token: token,
        useProjectHostname: true,
        useCdn: false,
    });

    console.log('validate graphql schema');

    const valid = await client.request({
        url: `/apis/graphql/${dataset}/${tag}/validate`,
        method: 'POST',
        body: {
            enablePlayground,
            schema
        },
        maxRedirects: 0,
    });

    const { validationError, breakingChanges, dangerousChanges } = valid;

    if (validationError) {
        throw new Error(`GraphQL schema is not valid: ${validationError}`);
    } else {
        console.log('graphql schema valid');
    }

    if (dangerousChanges.length > 0) {
        const message = 'found potentially dangerous changes from previous schema:\n' + dangerousChanges.map((change) => change.description).join('\n');
        console.log(message);
    }

    if (breakingChanges.length > 0) {
        const message = 'Found braking changes from previous schema:\n' + breakingChanges.map((change) => change.description).join('\n');
        console.log(message);
    }

    console.log('deploy sgraphql chema');

    const response = await client.request({
        url: `/apis/graphql/${dataset}/${tag}`,
        method: 'PUT',
        body: {
            enablePlayground,
            schema
        },
        maxRedirects: 0,
    });

    const graphQLUrl = client.getUrl(response.location.replace(/^\/(v1|v\d{4}-\d{2}-\d{2})\//, '/'));
    console.log('graphql schema deployed to: ' + graphQLUrl);
}

deployGraphQL({
    workDir: workDir,
    projectId: projectId,
    dataset: dataset,
    token: token,
    enablePlayground: true
}).catch((error) => {
    console.error('error', error);
});
