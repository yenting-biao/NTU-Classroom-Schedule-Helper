import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
import re
from os.path import dirname
from datetime import datetime
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import csv
import dotenv
import pandas as pd

class CourseTime:
    def __init__(self, sessions: list[str], day: int) -> None:
        if not (0 <= day <= 6):
            raise ValueError("Day must be between 0 and 6.")

        self.sessions = sessions
        self.day = day  # 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
        self.sessionToTime = {
            "0": ["07:10", "08:00"],
            "1": ["08:10", "09:00"],
            "2": ["09:10", "10:00"],
            "3": ["10:20", "11:10"],
            "4": ["11:20", "12:10"],
            "5": ["12:20", "13:10"],
            "6": ["13:20", "14:10"],
            "7": ["14:20", "15:10"],
            "8": ["15:30", "16:20"],
            "9": ["16:30", "17:20"],
            "10": ["17:30", "18:20"],
            "A": ["18:25", "19:15"],
            "B": ["19:20", "20:10"],
            "C": ["20:15", "21:05"],
            "D": ["21:10", "22:00"],
        }

    def getInterval(self) -> tuple[str, str]:
        # Return the start and end time of the course
        try:
            return (
                self.sessionToTime[self.sessions[0]][0],
                self.sessionToTime[self.sessions[-1]][1],
            )
        except KeyError:
            return ("N/A", "N/A")


class Course:
    def __init__(
        self,
        course_id: str,
        class_num: str,
        name: str,
        instructor: str,
        building: str,
        time: str,
    ) -> None:
        self.id = course_id + (f"-{class_num}" if len(class_num) > 0 else "")
        self.name = name
        self.instructor = instructor
        self.building = building
        self.time = time

    def __str__(self) -> str:
        return (
            f"{self.id}\t{self.name}\t{self.instructor}\t{self.building}\t{self.time}"
        )


class AllCourses:
    def __init__(self) -> None:
        self.courses: dict[Course] = {}

    def addCourse(self, course: Course) -> None:
        if course.id in self.courses:
            if course.time not in self.courses[course.id].time:
                self.courses[course.id].time += f" {course.time}"
            if course.building not in self.courses[course.id].building:
                self.courses[course.id].building += f" {course.building}"
        else:
            self.courses[course.id] = course

    def getCourse(self, course_id: str) -> Course:
        return self.courses[course_id]

    def getAllCourses(self) -> list[Course]:
        return list(self.courses.values())


def timeToSession(time: str) -> str:
    sessionToTime = {
        "0": ["7:10", "8:00"],
        "1": ["8:10", "9:00"],
        "2": ["9:10", "10:00"],
        "3": ["10:20", "11:10"],
        "4": ["11:20", "12:10"],
        "5": ["12:20", "13:10"],
        "6": ["13:20", "14:10"],
        "7": ["14:20", "15:10"],
        "8": ["15:30", "16:20"],
        "9": ["16:30", "17:20"],
        "10": ["17:30", "18:20"],
        "A": ["18:25", "19:15"],
        "B": ["19:20", "20:10"],
        "C": ["20:15", "21:05"],
        "D": ["21:10", "22:00"],
    }
    try:
        for key, value in sessionToTime.items():
            if time == value[0] or time == value[1]:
                return key
    except KeyError:
        return "N/A"


def getPageCourseData(soup: BeautifulSoup) -> list[dict]:
    js = soup.find_all("script")[-4]
    js = js.text.split("\n")[2]
    js = js.replace("\\/", "/")
    js = js.replace("var timeDT = ", "")
    js = js.replace(";", "")
    # turn js into a list of dictionaries
    data = eval(js)
    return data


def getDay(day: str) -> int:
    dayToNum = {
        "(日)": 0,
        "(一)": 1,
        "(二)": 2,
        "(三)": 3,
        "(四)": 4,
        "(五)": 5,
        "(六)": 6,
        "日": 0,
        "一": 1,
        "二": 2,
        "三": 3,
        "四": 4,
        "五": 5,
        "六": 6,
    }
    try:
        return dayToNum[day]
    except KeyError:
        return -1


def listSession() -> list[str]:
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "B", "C", "D"]


def getAllBuildings(soup: BeautifulSoup) -> list[str]:
    select = soup.find("select", {"id": "BuildingDDL"})
    options = select.find_all("option")
    buildings = [
        option["value"]
        for option in options
        if option.text != "" and option.text != "全部"
    ]
    return buildings


def getRoomByBuilding(building: str) -> list[str]:
    response = requests.get(
        f"https://gra206.aca.ntu.edu.tw/classrm/acarm/get-classroom-by-building?building={building}"
    )
    response = response.json()
    room_ls = response["room_ls"]
    rooms = [r["cr_no"] for r in room_ls]
    return rooms


def crawlPage(url: str, allCourseInfo: AllCourses) -> None:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    roomData = getPageCourseData(soup)

    for data in roomData:
        sessions = listSession()

        for session in sessions:
            key = f"Info{session}"

            if key in data:
                course = data[key][0]
                course = Course(
                    course["cr_cono"],
                    course["cr_clas"],
                    course["cr_cnam"],
                    course["cr_tenam"],
                    course["cr_no"],
                    course["cr_time"],
                )
                allCourseInfo.addCourse(course)


def parse_schedule(schedule_str):
    week_pattern = re.compile(r".[0-9+]*週")
    time_pattern = re.compile(r"\((.)\) (\d{1,2}:\d{2})~(\d{1,2}:\d{2})")

    schedules = []

    weeks = [0]
    week_match = week_pattern.search(schedule_str)
    if week_match:
        str_weeks = week_match[0]
        if str_weeks == "單週":
            weeks = [-1]
        elif str_weeks == "雙週":
            weeks = [-2]
        else:
            # eg. 第5+6+7+8+9+10+11+12+13+14+15+16週
            s = week_match[0][1:-1]
            s = s.split("+")
            weeks = [int(i) for i in s]

    # Find all matches for the time pattern in the schedule string
    for match in time_pattern.finditer(schedule_str):
        day, start_time, end_time = match.groups()
        schedules.append(
            {
                "weeks": weeks,
                "day": getDay(day),
                "start_time": timeToSession(start_time),
                "end_time": timeToSession(end_time),
            }
        )

    return schedules


def saveToDB(csvFileName: str):
    uri = dotenv.dotenv_values()["MONGODB_URI"]
    client = MongoClient(uri, server_api=ServerApi("1"))

    try:
        print(client.list_database_names())
        db = client["ntu-class-schedule"]
        collection = db["courses"]

        # Delete all documents in the collection
        collection.delete_many({})

    except Exception as e:
        print("Error connecting to MongoDB:")
        print(e)

    with open(csvFileName, "r") as file:
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

        # try:
        print(data)
        collection.insert_many(data)
        # except Exception as e:
            # print("Error inserting data into MongoDB:")
            # print(e)


def main():
    homePage = requests.get("https://gra206.aca.ntu.edu.tw/classrm/acarm/webcr-use-new")
    soup = BeautifulSoup(homePage.text, "html.parser")
    allCourseInfo = AllCourses()

    semester = "1141"
    buildings = getAllBuildings(soup)
    buildingAndRooms = {building: getRoomByBuilding(building) for building in buildings}

    print("Start Crawling All Courses...")
    for building, rooms in tqdm(buildingAndRooms.items(), desc=" Building", position=0):
        for room in tqdm(rooms, desc=" Room", position=1, leave=False):
            url = f"https://gra206.aca.ntu.edu.tw/classrm/acarm/webcr-use-new?SYearDDL={semester}&BuildingDDL={building}&RoomDDL={room}&SelectButton=%E6%9F%A5%E8%A9%A2"
            crawlPage(url, allCourseInfo)

    p = allCourseInfo.getAllCourses()
    p.sort(key=lambda x: x.id)
    
    p = [
        {
            "ID": i.id,
            "CourseName": i.name,
            "Instructor": i.instructor,
            "Building": i.building,
            "Time": i.time.replace(" ", ","),
        }
        for i in p
    ]
    p_df = pd.DataFrame(p)
    csvFileName = f"{dirname(__file__)}/csv/courses-{datetime.now().strftime('%Y-%m-%d_%H-%M')}.csv"
    
    p_df.to_csv(csvFileName, index=False)

    saveToDB(csvFileName)


if __name__ == "__main__":
    main()
