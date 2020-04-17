# Configuring a Custom Domain with Amazon Cognito

## Project setup

```sh
npm install
```

### Customize Cognito configuration

Edit `auth-config.js`

### Compiles and minifies for production

```sh
npm run build
```

### Deploy to S3

```sh
cd dist
aws s3 sync . s3://<YOUR BUCKET NAME>
```
