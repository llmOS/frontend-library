# OpenCopilot frontend library

This is an embeddable front-end for [OpenCopilot](https://docs.opencopilot.dev/).

If you are looking for the repository of the OpenCopilot Python framework, see [opencopilotdev/opencopilot](https://github.com/opencopilotdev/opencopilot).

## Usage

See [example](embed.html) for usage example


## Local setup

Install pnpm
```
npm install -g pnpm
```

Install packages
```
pnpm install
```

Building:
```
pnpm run build
```
This generates .js file in the "dist" directory

See [example](embed.html) for usage example

If using eslint then might need to add this to eslint:
```
"rules": {
    "react/display-name": "off"
}
```


## Publishing
```
cd dist
npm publish --access public
```
