# Imports
import os
import json
import pandas as pd
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey


def readJson():
    # reading the JSON data using json.load()
    file = 'n.json'
    dict_train = []
    with open(file, encoding='utf-8') as train_file:
        line = train_file.readline()
        while(line):
            pre_doc = json.loads(json.dumps(
                line, indent=4, sort_keys=True, default=str))
            pre_doc = json.loads(pre_doc)
            doc = {
                "id": pre_doc["id"],
                "creacion": pre_doc["created_at"],
                "tweet": pre_doc["tweet"],
                "urls": pre_doc["urls"],
                "replies": pre_doc["replies_count"],
                "retweets": pre_doc["retweets_count"],
                "likes": pre_doc["likes_count"],
                "hashtags": pre_doc["hashtags"]
            }
            dict_train.append(doc)
            line = train_file.readline()
    print(len(dict_train))
    return dict_train


def upload(client, dict_train):
    obj = {
        "_id": "20000",
        "tweets": dict_train[17500:]
    }

    newDocument = client["tweetdb"].create_document(
        json.loads(json.dumps(obj, indent=4, sort_keys=True, default=str)))

    if newDocument.exists():
        print("Document successfully created.")


if __name__ == "__main__":
    serviceUsername = "bd26a1db-4837-400f-af1d-dbed3670e2c0-bluemix"
    servicePassword = "92da0565520824dc239cb23a45cb102277f44da00afb23cdaa7dcae03adc474e"
    client = Cloudant(serviceUsername, servicePassword,
                      url="https://bd26a1db-4837-400f-af1d-dbed3670e2c0-bluemix:92da0565520824dc239cb23a45cb102277f44da00afb23cdaa7dcae03adc474e@bd26a1db-4837-400f-af1d-dbed3670e2c0-bluemix.cloudantnosqldb.appdomain.cloud")

    client.connect()
    list_tweets = readJson()
    upload(client, list_tweets)
    client.disconnect()
    pass
