FROM python:3.10
RUN mkdir /kanban-backend
WORKDIR /kanban-backend
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN chmod a+x docker/*sh