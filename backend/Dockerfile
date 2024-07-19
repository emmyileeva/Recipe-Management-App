FROM python:3

# set the working directory
WORKDIR /code

# copy requirements.txt into /code
COPY requirements.txt /code/

RUN pip install -r requirements.txt

# copy everything else after install
COPY . /code/

EXPOSE 8000 

ENTRYPOINT ["python3"] 
CMD ["manage.py", "runserver", "0.0.0.0:8000"]