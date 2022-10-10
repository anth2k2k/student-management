from sqlalchemy.orm import Session
from database import engine, SessionLocal
from fastapi import FastAPI, HTTPException, Depends, Response, Request

import models
import datetime
import xml.etree.ElementTree as ET


# CREATE API
app = FastAPI()
models.Base.metadata.create_all(bind=engine)


# CONNECT TO DATABASE
def get_db():
    global db
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


# GET STUDENT LIST
@app.get("/")
def get_students(db: Session = Depends(get_db)):
    model_students = db.query(models.Students).all()
    root = ET.Element("students")
    for item in model_students:
        student = ET.SubElement(root, "student")
        student.set("id", str(item.id))
        ET.SubElement(student, "student_id").text = item.student_id
        ET.SubElement(student, "first_name").text = item.first_name
        ET.SubElement(student, "last_name").text = item.last_name
        ET.SubElement(student, "email").text = item.email
        ET.SubElement(student, "birth_year").text = str(item.birth_year)
        ET.SubElement(student, "birth_place").text = item.birth_place
        ET.SubElement(student, "final_grade").text = str(item.final_grade)
    result = ET.tostring(root)
    return Response(content=result, media_type="application/xml")


# GET STUDENT BY ID
@app.get("/get-student/{id}")
def get_student_by_id(id: int, db: Session = Depends(get_db)):
    student_model = db.query(models.Students).filter(
        models.Students.id == id).first()
    if student_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"ID={id} : Does not exist"
        )
    student = ET.Element("student")
    student.set("id", str(student_model.id))
    ET.SubElement(student, "student_id").text = student_model.student_id
    ET.SubElement(student, "first_name").text = student_model.first_name
    ET.SubElement(student, "last_name").text = student_model.last_name
    ET.SubElement(student, "email").text = student_model.email
    ET.SubElement(student, "birth_year").text = str(student_model.birth_year)
    ET.SubElement(student, "birth_place").text = student_model.birth_place
    ET.SubElement(student, "final_grade").text = str(student_model.final_grade)
    result = ET.tostring(student)
    return Response(content=result, media_type="application/xml")


# CREATE STUDENT
@app.post("/create-student")
async def create_student(request: Request, db: Session = Depends(get_db)):
    content_type = request.headers['Content-Type']
    if content_type == 'application/xml':
        body = await request.body()
        student = ET.fromstring(body.decode())
        student_model = models.Students()
        student_model.student_id = student.find("student_id").text
        student_model.first_name = student.find("first_name").text
        student_model.last_name = student.find("last_name").text
        student_model.email = student.find("email").text
        student_model.birth_year = datetime.datetime.strptime(student.find("birth_year").text, '%Y-%m-%d').date()
        student_model.birth_place = student.find("birth_place").text
        student_model.final_grade = float(student.find("final_grade").text)
        db.add(student_model)
        db.commit()
    else:
        raise HTTPException(
            status_code=404,
            detail="Please input XML"
        )
    return "Create student successfully"


# UPDATE STUDENT
@app.put("/update-student/{id}")
async def update_student(id: int, request: Request, db: Session = Depends(get_db)):
    student_model = db.query(models.Students).filter(
        models.Students.id == id).first()
    if student_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"ID={id} : Does not exist"
        )
    content_type = request.headers['Content-Type']
    if content_type == 'application/xml':
        body = await request.body()
        student = ET.fromstring(body.decode())
        student_model.student_id = student.find("student_id").text
        student_model.first_name = student.find("first_name").text
        student_model.last_name = student.find("last_name").text
        student_model.email = student.find("email").text
        student_model.birth_year = datetime.datetime.strptime(student.find("birth_year").text, '%Y-%m-%d').date()
        student_model.birth_place = student.find("birth_place").text
        student_model.final_grade = float(student.find("final_grade").text)
        db.add(student_model)
        db.commit()
    else:
        raise HTTPException(
            status_code=404,
            detail="Please input XML"
        )
    return "Update student successfully"


# DELETE STUDENT
@app.delete("/delete-student/{id}")
def delete_student(id: int, db: Session = Depends(get_db)):
    student_model = db.query(models.Students).filter(
        models.Students.id == id).first()
    if student_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"ID={id} : Does not exist"
        )
    db.query(models.Students).filter(models.Students.id == id).delete()
    db.commit()
    return 'Delete student successfully'
