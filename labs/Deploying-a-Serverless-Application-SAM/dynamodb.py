#!/usr/bin/env python3

"""This script seeds the 'friends' DynamoDB table with data"""

from time import sleep

import boto3
from botocore.exceptions import ClientError

TABLE_NAME = "friends"


def wait_for_table_active():
    client = boto3.client("dynamodb")
    print(f"Waiting for table {TABLE_NAME} to finish creating...")
    waiter = client.get_waiter("table_exists")
    waiter.wait(TableName=TABLE_NAME)
    active = False
    while not active:
        table_description = client.describe_table(TableName=TABLE_NAME)
        print(f"Waiting for DynamoDB table {TABLE_NAME} to become active...")
        current_status = table_description["Table"]["TableStatus"]
        active = current_status == "ACTIVE"
        sleep(1)


def seed_data():
    print(f"Seeding {TABLE_NAME} table...")
    table = boto3.resource("dynamodb").Table(TABLE_NAME)
    try:
        with table.batch_writer() as batch:
            batch.put_item(Item={"id": 1, "name": "Paquito Pinhorn"})
            batch.put_item(Item={"id": 2, "name": "Chilton Josupeit"})
            batch.put_item(Item={"id": 3, "name": "Nick Maybey"})
            batch.put_item(Item={"id": 4, "name": "Anton Garron"})
            batch.put_item(Item={"id": 5, "name": "Reagen Scroggs"})
            batch.put_item(Item={"id": 6, "name": "Carlye Crady"})
            batch.put_item(Item={"id": 7, "name": "Ange Pople"})
            batch.put_item(Item={"id": 8, "name": "Stephanie Do"})
            batch.put_item(Item={"id": 9, "name": "Tiffanie Ratchford"})
            batch.put_item(Item={"id": 10, "name": "Jennifer Garvin"})
        print(table.scan()["Items"])
    except ClientError as e:
        print(e)


if __name__ == "__main__":
    wait_for_table_active()
    seed_data()
    print("Done.")
