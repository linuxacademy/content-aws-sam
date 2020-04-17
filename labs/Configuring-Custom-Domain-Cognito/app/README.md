# Configuring a Custom Domain with Amazon Cognito

## Project setup

```sh
npm install
```

### Customize Cognito configuration

Rename `src/auth-config.js.example` to `src/auth-config.js` and enter your Cognito configuration.

### Compile and minify for production

```sh
npm run build
```

### Deploy to S3

```sh
cd dist
aws s3 sync . s3://<YOUR BUCKET NAME>
```
