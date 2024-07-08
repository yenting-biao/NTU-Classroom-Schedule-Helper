from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import dotenv
import csv
from crawl import parse_schedule


def main():
    uri = dotenv.dotenv_values()["MONGO_URI"]
    client = MongoClient(uri, server_api=ServerApi("1"))

    try:
        print(client.list_database_names())
        db = client["ntu-class-schedule"]
        collection = db["courses"]

        # Delete all documents in the collection
        collection.delete_many({})

    except Exception as e:
        print(e)

    with open("courses.csv", "r") as file:
        next(file)
        data = [
            {**row, "time": parse_schedule(row["time"])}
            for row in csv.DictReader(
                file, fieldnames=["id", "name", "instructor", "room", "time"]
            )
        ]
        for row in data:
            for time in row["time"]:
                assert (
                    time["weeks"] is not None
                    and time["day"] is not None
                    and time["start_time"] is not None
                    and time["end_time"] is not None
                )

        try:
            collection.insert_many(data)
        except Exception as e:
            print(e)


if __name__ == "__main__":
    main()
