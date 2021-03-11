# ✨ Starter Gatsby Sanity Theme ✨

This is a Starter [Gatsby](https://gatsbyjs.com) theme powered by [Sanity](https://www.sanity.io).

Click the button below to create a new site from this theme using Stackbit:

[![Create with Stackbit](https://assets.stackbit.com/badge/create-with-stackbit.svg)](https://app.stackbit.com/create?theme=https://github.com/stackbit-themes/starter-gatsby-sanity&utm_source=theme-readme&utm_medium=referral&utm_campaign=stackbit_themes)

<img src="https://themes.stackbit.com/images/starter-demo-1024x768.png" width="600">


## Editing Content

Once Stackbit creates a site, you can start editing the content using the free on-page editing experience provided by the [Stackbit Studio](https://stackbit.com?utm_source=project-readme&utm_medium=referral&utm_campaign=user_themes).

[![](https://i3.ytimg.com/vi/zd9lGRLVDm4/hqdefault.jpg)](https://stackbit.link/project-readme-lead-video)

Here's a few resources to get you started:

- 📺 &nbsp; [Editing Content](https://stackbit.link/project-readme-editing-video)
- 📺 &nbsp; [Adding, Reordering and Deleting Items](https://stackbit.link/project-readme-adding-video)
- 📺 &nbsp; [Collaboration](https://stackbit.link/project-readme-collaboration-video)
- 📺 &nbsp; [Publishing](https://stackbit.link/project-readme-publishing-video)
- 📚 &nbsp; [Stackbit Documentation](https://stackbit.link/project-readme-documentation)

If you need a hand, make sure to check the [Stackbit support page](https://stackbit.link/project-readme-support).


## Develop Locally

1. [Create a site](https://app.stackbit.com/create?theme=https://github.com/stackbit-themes/starter-gatsby-sanity&utm_source=theme-readme&utm_medium=referral&utm_campaign=stackbit_themes) from this theme using Stackbit.

1. Stackbit will create a new GitHub repository, a [Sanity](https://www.sanity.io) project, and deploy the site via the selected serverless deployment platform (e.g., [Netlify](https://www.netlify.com)).

1. Stackbit will deploy the [Sanity Studio](https://www.sanity.io/studio) and [Stanity GraphQL API](https://www.sanity.io/docs/graphql) for you.

1. Once finished, you will be redirected to Stackbit Studio where you will be
   able to edit the content using the free on-page editing experience, and
   publish new versions of your site

1. To develop your site locally, clone the generated repository.

1. Install npm dependencies:

        npm install

1. Optionally, run Sanity Studio locally by installing sanity-cli, and then installing and running the studio from the `/studio` directory. You may be required to login with the Sanity CLI.

        npm install -g @sanity/cli
        cd studio
        sanity login
        sanity install
        sanity start

1. Set the following environment variables locally.

   - `SANITY_PROJECT_ID` - Sanity project ID (you can copy it from the `api.projectId` key in [studio/sanity.json](studio/sanity.json))
   - `SANITY_DATASET` - Sanity dataset name (optional, default is `production`)
   - `SANITY_TOKEN` - Sanity read-write token (you can copy it from the "environment" section in your Netlify site https://app.netlify.com/sites/<netlify-site-name>/settings/deploys#environment)

1. Start the Gatsby local development server (run from project root):

        npm run develop

1. Open [http://localhost:8000/](http://localhost:8000/) in the browser.
   You can now edit the site contents in the local Sanity Studio, and the
   browser will live-update your changes. 🎉


## Contributing

To contribute to this theme please follow the following steps:

1. Clone this repository locally

1. Install Sanity CLI

        npm install -g @sanity/cli

1. Login into Sanity

        sanity login

1. Install dependencies

        npm install
        
1. Create an empty Sanity project, and a "production" dataset (this just creates
   a project)

        node sanity-export/create-project.js
        
        > creating a project...
        > created a project, projectId: dgaiu42f
        > creating a dataset...
        > created a dataset

1. Copy paste the projectId from previous step and import the content to the project

        node sanity-export/import.js <project_id>

1. Replace the `SANITY_PROJECT_ID` in [studio/sanity.json](studio/sanity.json)
   with your Sanity project id
   
1. Install and start local Sanity Studio

        cd studio
        sanity install

1. Deploy Sanity GraphQL API (from within studio folder)

        sanity graphql deploy --playground

1. Start Sanity Studio (from within studio folder)

        sanity start

   Sanity studio is now available at http://localhost:3333
   
1. Define following environment variables to allow Gatsby to fetch the content
   from Sanity when developing or building the site. You will need to create a
   "read-write" token in your Sanity project settings page 
   (https://manage.sanity.io/projects/__PROJECT_ID__/settings/api)

       export SANITY_PROJECT_ID=<project_id>
       export SANITY_DATASET=production
       export SANITY_TOKEN=<read_write_token>

1. Run gatsby development server locally (from project root folder) 

        npm run develop
        
    Navigate to [http://localhost:8000](http://localhost:8000) to see the website.
    You can now edit the site contents in the local Sanity Studio, and the
    browser will live-update your changes.

1. Once you finish updating the code and contents, export the contents
   back to sanity-export/export.json by running

        node sanity-export/export.js <project_id>

1. Set back the `"projectId": "SANITY_PROJECT_ID"` in [studio/sanity.json](studio/sanity.json)

1. Commit, push and submit a pull-request 🎉


## Colophon

Generated at `2021-02-14T16:04:07.807Z` by Stackbit version `0.3.48`.
