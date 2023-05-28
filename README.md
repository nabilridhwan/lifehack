# This is a monorepo

Monorepo allows us to manage multiple packages in a single repository. This is useful for us to manage our packages and dependencies. This is also useful for sharing code between apps (e.g. `apps/web` and `apps/mobile`).

## TODO:

-   prisma
-   eslint
-   prettier

## Contribute

Copy paste `.env.example` to `.env` and fill in the values.

The underlying monorepo we use is Turborepo. To start all dev commands, run `yarn dev`

1.  Clone this repo
2.  Run `yarn install`
3.  Run `yarn dev` to start all dev commands

### Adding a package as part of the mono repo

> All packages are in the `packages` folder.
> There is a `packages/sample-package` folder that you can use as a template. It is in Typescript. You can copy and paste the folder, make some adjustments and you are ready with a new package.

Within `sample-package`,

1.  All files are in `src/`
2.  The build output is in `dist/`
3.  Remember to rename your package in `package.json`. Make sure to prefix it with `@your-username/` (e.g. `@lifehack/ui`)
4.  In the workspace where you need to use this package, add `@your-username/sample-package` as a dependency (in the devDependencies). For example, if you are in `apps/web`, modify your `package.json` to include `@your-username/sample-package` in the `devDependencies` section.

```json
"devDependencies": {
    "@your-username/sample-package": "*"
}
```

5. Run `yarn install` to use the new package.
