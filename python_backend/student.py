from pydantic import BaseModel, Field

import datetime


# STUDENT OBJECT
class Student(BaseModel):
    student_id: str = Field(min_length=1)
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    email: str = Field(regex=".+\@.+\..+")
    birth_year: datetime.date
    birth_place: str = Field(min_length=1)
    final_grade: float = Field(ge=0, le=10)
