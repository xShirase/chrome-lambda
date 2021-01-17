# Scheduler

## The Mission
Prototyping the replacement of the current scheduler

### Stack
- Node 12
- TypeScript
- AWS :
    - API: [ApiGateway](https://aws.amazon.com/api-gateway/)
    - Code: [Lambda](https://aws.amazon.com/lambda/)
    - Event bus:[EventBridge](https://aws.amazon.com/eventbridge)
    - Queue(s): [SQS](https://aws.amazon.com/sqs)
- Deployment: [Serverless](https://www.serverless.com/)

### Prerequisites

- Valid AWS credentials able to switch to the `ServerlessDeveloper` role

### JIRA

[Link to Epic](https://wonderbill.atlassian.net/browse/AUTO-814)

### Install

- Install serverless: https://www.serverless.com/framework/docs/providers/aws/guide/installation/

### Deployment

- Feature branches :
    - branch name should be `feature/auto-XXX` (XXX = jira ticket number)
    - deploy using `yarn run feature-deploy`

This should create a stack on AWS called `scheduler-auto-XXX`

### Testing

Run unit tests with:
```bash
$ yarn run test-unit
```

To run integration tests, you must first deploy your feature with `yarn run feature-deploy` which will create `build/stack.json` and `build/apiKey.json` files, then run:
```bash
$ yarn run test-integration
```
