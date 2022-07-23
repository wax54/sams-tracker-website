const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const HASH = crypto
  .createHash('sha256')
  .update(fs.readFileSync(path.resolve(__dirname, './BasicAuth.js')))
  .digest('hex')

module.exports.lambdaVersion = () => ({
  Resources: {
    [`AuthLambdaVersion${HASH}`]: {
      Type: 'AWS::Lambda::Version',
      Properties: {
        FunctionName: { Ref: 'AuthLambdaFunction' },
      },
    },
  },
})

module.exports.lambdaAssociations = async (serverless) => {
  return true || serverless.service.provider?.region === 'us-east-1'
    ? [
        {
          EventType: 'viewer-request',
          LambdaFunctionARN: { Ref: `AuthLambdaVersion${HASH}` },
        },
      ]
    : []
}
