FROM python:3.8.11

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY . /code/
RUN cd /code/
RUN pip install -r requirements.txt
