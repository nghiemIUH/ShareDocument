FROM python:3.8.10
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
CMD python ShareDocument/manage.py collectstatic --noinput