from database import Base
from sqlalchemy import Column, Integer, Float, String, Date


# STUDENT TABLE IN DATABASE
class Students(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    date_of_birth = Column(Date)
    birth_place = Column(String)
    final_grade = Column(Float)
