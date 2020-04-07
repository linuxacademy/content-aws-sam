import os
import boto3

table_name = os.environ["TABLE_NAME"]
table = boto3.resource("dynamodb").Table(table_name)


def lambda_handler(event, context):
    items = table.scan()["Items"]
    return {
        "friends": items,
    }
