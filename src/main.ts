import { App, Stack, StackProps } from 'aws-cdk-lib';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import assert from 'node:assert';
import { configDotenv } from 'dotenv';
configDotenv()

const {HOSTED_ZONE_NAME, HOSTED_ZONE_ID, ARECORD_NAME, ARECORD_VALUE} = process.env

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    assert(HOSTED_ZONE_NAME)
    assert(HOSTED_ZONE_ID)
    assert(ARECORD_NAME)
    assert(ARECORD_VALUE)

    const hostedZone = HostedZone.fromHostedZoneAttributes(this,'ImportedHZ', {
      hostedZoneId: HOSTED_ZONE_ID,
      zoneName: HOSTED_ZONE_NAME,
    })
    new ARecord(this, 'ImportedARecord', {
      target: RecordTarget.fromValues(ARECORD_VALUE),
      zone: hostedZone,
      recordName: ARECORD_NAME
    })
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'aws-cdk-recreate-dev', { env: devEnv });

app.synth();
